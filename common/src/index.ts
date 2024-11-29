import z from 'zod'


export const SignupInput = z.object({
    email:z.string().email(),
    password:z.string().min(5),
    username:z.string().toLowerCase(),
    firstName:z.string(),
    lastName:z.string(),
    image:z.string().optional(),
})


const SigninInput = z.object({
    email:z.string().email(),
    password:z.string().min(5)
})