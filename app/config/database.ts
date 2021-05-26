import { config } from "dotenv";
config();

import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
    } catch (error) {
        console.error("Failed to connect to the database ... ");
        process.exit(1);
    }
};

connectToDb().then();
