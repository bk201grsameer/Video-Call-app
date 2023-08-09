const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const port = 8000;
const app = express();

app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

io.on("connection", (socket) => {
    console.log(`[+] User connected from id :${socket.id}`.toUpperCase());
    /*WHEN THE USER IS CONNECTED SEND*/
    socket.emit('me', socket.id);
    /* WHEN THE USER IS DISCONNECTED */
    socket.on('disconnect', () => {
        /* BROADCAST TO ALL THE USERS THAT THIS CLIENT HAS DISCONNECTED */
        console.log(`[-] User disconnected from id :${socket.id}`.toUpperCase());
        socket.broadcast.emit('callEnded');
    });
    /* CALL USER */
    socket.on('call:User', ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit('call:User', { signalData, from, name });
    });
    /* ANSWER CALL */
    socket.on('answer:Call', (data) => {
        io.to(data.to).emit("call:Accepted", data.signal);
    });
});

httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});