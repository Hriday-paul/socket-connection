const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const serverio = require('socket.io');
const port = 3000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = serverio(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    console.log('server socket is connected');
    socket.on('server socket is disconnect', () => {
        console.log('disconnect');
    });

    //receive message 
    socket.on('sendMessage', async (messageInfo, recever) => {
        // console.log(messageInfo, recever);
        
        // send message by uniq id
        await socket.broadcast.emit(recever, messageInfo);

    });
});


server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});