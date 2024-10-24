import dotenv from "dotenv";
import express from "express";
import cors, { CorsOptions } from "cors";
import { createServer } from "node:http";
import router from "./routes";
import {port} from "./constants";

dotenv.config();

// CORS
const corsOptions: CorsOptions = {
  origin: '*',
};

const app = express();
const server = createServer(app);

//Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(router);
app.use(express.static('public'));


server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
