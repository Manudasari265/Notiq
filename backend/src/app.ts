import express, { Request, Response, Application } from 'express';
import { UserRequiredType, UserRequiredZod } from './validations/UserSchema';
import { ResponseErrors, ResponseErrorCode } from './types/ResponseStatus/ResponseErrors.types';
import { ResponseSuccess, ResponseSuccessCode } from './types/ResponseStatus/ResponseSuccess.types';
import { ResponseServer, ResponseServerCode } from './types/ResponseStatus/ResponseServer.types';
import cors from 'cors';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { UserModel } from './config/db';
import jwt from 'jsonwebtoken';

const app: Application = express();
const JWT_SECRET = process.env.JWT_SECRET as string;

app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req: Request, res: Response) => {
    const parsedBody = UserRequiredZod.safeParse(req.body);

    if (!parsedBody.success) {
        res.status(ResponseErrors.INPUT_ERRORS).json({
            message: "Incorrect format",
            errors: parsedBody.error.errors,
        });
        return;
    }

    const userData: UserRequiredType = parsedBody.data;

    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        await UserModel.create({
            username: userData.userName,
            password: hashedPassword,
            email: userData.email,
        });

        res.status(ResponseSuccess.ACCEPTED).json({
            message: "User signed up successfully",
        });
    } catch(e: any) {
        if(e.code === ResponseErrors.DB_DUPLICATE_KEY) {
            res.status(ResponseErrors.FORBIDDEN).json({
                message: "User already exists",
            });
            return
        }
        res.status(ResponseServer.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
        })
    }
});

app.post("/api/v1/signin", async function(req: Request, res: Response) {
    const { username } = req.body;
    const { password } = req.body;

    if(!username || !password) {
        res.status(ResponseErrors.BAD_REQUEST).json({
            message: "Username and password are required."
        });
        return;
    }

    try {
        const existingUser = await UserModel.findOne({
            username,
        });
    
        if(!existingUser) {
            res.status(ResponseErrors.NOT_FOUND).json({
                message: "User not found",
            });
            return;
        }
        
        const hashPasswordFromDb = existingUser.password;
        const passwordMatch = await bcrypt.compare(password, hashPasswordFromDb);

        if(passwordMatch) {
            const token = jwt.sign({
                id: existingUser._id
            }, JWT_SECRET);

            res.json({
                token,
            })
            return;
        } else {
            res.status(ResponseErrors.UNAUTHORIZED).json({
                message: "Incorrect credentials",
            })
            return;
        }
    } catch (error) {
        res.status(ResponseServer.INTERNAL_SERVER_ERROR).json({
            message: "An unexpected error occurred.",
        })
    }
});

app.post("/api/v1/content", function(req: Request, res: Response) {

});

app.get("/api/v1/content", function(req: Request, res: Response) {

});

app.delete("/api/v1/content", function(req: Request, res: Response) {

});

app.post("/api/v1/brain/share", function(req: Request, res: Response) {

});

app.get("/api/v1/brain/:shareLink", function(req: Request, res: Response) {

});

export default app;