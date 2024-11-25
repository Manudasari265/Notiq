import express, { Request, Response, Application } from 'express';
import cors from 'cors';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());



export default app;
