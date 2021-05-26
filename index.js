import "./app/config/database.js";

import express from "express";
import path from "path"

import routes from "./app/routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
    res.sendFile(path.join(path.resolve(), "app/views/index.html"))
);

app.use("/api", routes);

app.listen(process.env.PORT, () =>
    console.log(
        `[${new Date()}] Development Server  (http://localhost:${
            process.env.PORT
        }) started`
    )
);
