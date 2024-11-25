import express, { Request, Response, Application } from 'express';
import cors from 'cors';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", function(req: Request, res: Response) {
    const { firstName, lastName } = req.body;
    const { username } = req.body;
    const { password } = req.body;
    const { email } = req.body;

    //TODO hash the password, input validation using zod
})

export default app;
