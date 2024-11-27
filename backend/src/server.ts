import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DATABASE_URL;
const PORT = process.env.PORT;

async function main() {
    try {
            if(!dbUrl) {
                console.log("DATABASE_URL is not defined in the environment variables");
                process.exit(1);
            }
            await mongoose.connect(dbUrl as string);
            console.log("database is connected");
            app.listen(PORT, () => {
            console.log(`Server started listening on port: ${PORT}`)
        })
    } catch (error) {
        console.log(`Application failed to start the server`);
    }
}

main()