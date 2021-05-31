import "./app/config/database";

import express from "express";

import { join, resolve } from "path"

import routes from "./app/routes";
import { User } from "./app/interfaces/user";

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile(join(resolve(), "app/views/index.html"))
});

app.use("/api", routes)

app.listen(process.env.PORT, () =>
    console.log(
        `[${new Date()}] Development Server  (http://localhost:${
            process.env.PORT
        }) started`
    )
);
