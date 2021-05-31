import "./src/config/database.js";

import express, { Application, Response, Request} from "express";

import { join, resolve } from "path"

import routes from "./src/routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) =>
    res.sendFile(join(resolve(), "src/views/index.html"))
);

app.all("/api").use(routes)

app.listen(process.env.PORT, () =>
    console.log(
        `[${new Date()}] Development Server  (http://localhost:${
            process.env.PORT
        }) started`
    )
);
