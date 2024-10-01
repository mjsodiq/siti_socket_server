import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.get("/", (req, res) => {
	return res.send("test");
});
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log(`user ${socket.id} connected`);
	socket.on("notify", (arg) => {
		socket.emit("notify", { socket_id: socket.id });
		console.log(arg);
	});
});

server.listen(8090, () => {
	console.log(`server running at ${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`);
});
