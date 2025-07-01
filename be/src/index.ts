import express, { Express } from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import socketHandler from "./socket";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

socketHandler(io); // socket

server.listen(PORT, () => console.log(`Running on ${PORT}`));
