import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/errorHandler";
import otpGenerator from "otp-generator";
import { mailSender } from "../utils/mailSender";
import { ApiResponse } from "../utils/apiResponse";
import cron from "node-cron";

const prisma = new PrismaClient();

let cleanUpJob: any = null;

const deleteExpiredOtp = async (): Promise<number> => {
  const now = new Date(Date.now());
  const otps = await prisma.otp.deleteMany({
    where: {
      expiresAt: {
        lt: now,
      },
    },
  });
  return otps.count;
};

const startCleanupJob = () => {
  if (!cleanUpJob) {
    cleanUpJob = cron.schedule("* * * * * ", async () => {
      const value: number = await deleteExpiredOtp();

      if (value > 0) {
        console.log("******");
        stopCleanUpJobs();
      }
    });
  }
};

const stopCleanUpJobs = () => {
  if (cleanUpJob) {
    cleanUpJob.stop();
    cleanUpJob = null;
  }
};

export const otp = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  if (email.length === 0) {
    throw new ApiError(402, "Email isnt valid ", false);
  }
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  if (user) {
    throw new ApiError(401, "User already exist", false);
  }

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const stringOtp = parseInt(otp);

  const sendOtp = await mailSender(email, "Your one time password is ", otp);

  if (!sendOtp) {
    throw new ApiError(
      402,
      "Failed to send otp, Please try again later",
      false
    );
  }

  const createOtp = await prisma.otp.create({
    data: {
      email: email,
      otp: stringOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      createdAt: new Date(Date.now()),
    },
  });

  startCleanupJob();

  res.status(200).json(new ApiResponse(true, "Otp send successfully", {}));
});
