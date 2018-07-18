require('dotenv').config();
const { createServer }  = require('http');
const { Server, OPEN } = require('ws');
const { EventEmitter } = require('events');
const path = require('path');
const fileSystem = require('fs');
const ws_port = process.env.WEB_SOCKET_PORT;

let event = null;

const server = new createServer((req, res) => {
    if (req.url === '/get') {
        event = new EventEmitter();
        event.on('data', (data) => {
            res.write(data);
            res.end();
            event.removeListener('data', () => {});
            event = null;
        });
    } else {
        const filePath = path.join(__dirname, 'index.html');
        res.writeHeader(200, {"Content-Type": "text/html"});
        const readStream = fileSystem.createReadStream(filePath);
        readStream.pipe(res);
    }
});


const wss = new Server({ server });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        if (event) {
            event.emit('data', message);
            console.log('received: ', message);
        }
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === OPEN) {
                client.send(message);
            }
        });
    });
});

server.listen(ws_port, '0.0.0.0', () => {
    console.log(`Web socket server listening on port ${ws_port}`);
});
