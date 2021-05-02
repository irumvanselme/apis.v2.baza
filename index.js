import { config } from "dotenv";
config();

import express from "express";

const app = express();

app.listen(process.env.PORT, () =>
    console.log(
        `[${new Date()}] Development Server  (http://localhost:${
            process.env.PORT
        }) started`
    )
);
