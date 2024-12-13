const express = require('express');
const { WebSocketServer } = require('ws');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.get('/', (req, res) => {
    res.send('WebSocket server is running!');
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
    console.log('A client connected.');

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);

        const data = JSON.parse(message);
        wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
                client.send(JSON.stringify(data));
            }
        });

    });

    socket.on('close', () => {
        console.log('A client disconnected.');
    });
});
