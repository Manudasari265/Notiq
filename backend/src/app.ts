import express, { Express, Request, Response, Application } from 'express';
import { UserRequiredType, UserRequiredZod } from './validations/UserSchema';
import { ResponseErrors, ResponseErrorCode } from './types/ResponseStatus/ResponseErrors.types';
import { ResponseSuccess, ResponseSuccessCode } from './types/ResponseStatus/ResponseSuccess.types';
import { ResponseServer, ResponseServerCode } from './types/ResponseStatus/ResponseServer.types';
import cors from 'cors';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { UserModel } from './config/db';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://manojdasari:misXSnFK99aV4XY4@cluster0.jdxax.mongodb.net/notiqDb");

app.post("/api/v1/signup", async (req: Request, res: Response) => {
    const parsedBody = UserRequiredZod.safeParse(req.body);

    if (!parsedBody.success) {
        res.status(400).json({ //& 400
            message: "Incorrect format",
            errors: parsedBody.error.errors, // Detailed validation errors
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

        res.status(201).json({
            message: "User signed up successfully",
        });
    } catch(e: any) {
        if(e.code === 11000) {
            res.status(409).json({
                message: "User already exists",
            });
            return
        }
        console.error(e);
        res.status(500).json({
            message: "Internal server error",
        })
    }
});

app.post("/api/v1/signin", function(req: Request, res: Response) {

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

async function main() {
    try {
            const mongooseDb = await mongoose.connect("mongodb+srv://manojdasari:misXSnFK99aV4XY4@cluster0.jdxax.mongodb.net/notiqDb");
            console.log("database is connected");
            await app.listen(process.env.PORT || 3000, () => {
            console.log(`Server started listening on port: ${3000}`)
        })
    } catch (error) {
        console.log(`Application failed to start the server`);
    }
}

main()