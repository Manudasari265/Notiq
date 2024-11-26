import { z } from 'zod';

export const UserRequiredZod = z.object({
    userName: z.string()
        .min(5, {message: "Username must be at least 5 characters"}) 
        .max(20, {message: "Username must be no more than 20 characters long"}),
    password: z.string()
        .min(8, {message: "Password must be at least 8 characters"})
        .max(100, {message: "Password must be no more than 100 characters long"}),
    email: z.string()
        .email({message: "Invalid email format"}),
});

export type UserRequiredType = z.infer<typeof UserRequiredZod>;