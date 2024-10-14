import dotenv from "dotenv";
import express from "express";
import cors, { CorsOptions } from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";
import router from "./routes";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
} from "./types";
import { findCustomers } from "./controllers/customer";

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

// Socket.io
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents
>(server, {
  cors: { origin: "*" },
});
io.on("connection", async (socket) => {
  socket.on("searchCustomers", (data) => findCustomers(data, socket));
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
