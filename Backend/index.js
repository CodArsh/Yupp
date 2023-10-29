import express from "express";
import { Connection } from "./database/db.js";
import dotenv from "dotenv";
import Router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";

// express integration
const app = express();

// configuration for environmet variables
dotenv.config();
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// handle two different url's in browser using 'cors'
app.use(cors());

// handle two POST api for 'request.body' data
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// router connection
app.use("/", Router);

// PORT ID
const PORT = 8080;

// connection with database
Connection(USERNAME, PASSWORD);

// start server
app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);