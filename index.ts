import dotenv from "dotenv";
import express from "express";
import cors, { CorsOptions } from "cors";
import { createServer } from "node:http";
import router from "./routes";

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


const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
