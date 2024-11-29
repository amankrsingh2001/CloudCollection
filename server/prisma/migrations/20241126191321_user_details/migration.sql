-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT[],
ADD COLUMN     "likes" INTEGER,
ADD COLUMN     "tag" TEXT[],
ALTER COLUMN "published" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "refreshToken" DROP NOT NULL;

-- CreateTable
CREATE TABLE "UserDetail" (
    "id" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "userRelId" TEXT NOT NULL,

    CONSTRAINT "UserDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_userRelId_key" ON "UserDetail"("userRelId");

-- AddForeignKey
ALTER TABLE "UserDetail" ADD CONSTRAINT "UserDetail_userRelId_fkey" FOREIGN KEY ("userRelId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
