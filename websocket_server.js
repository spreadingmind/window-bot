const { createServer }  = require('http');
const { Server } = require('ws');
const { EventEmitter } = require('events');
const ws_port = 8765;

let event = null;

const server = new createServer((req, res) => {
  event = new EventEmitter();
  event.on('data', (data) => {
    res.write(data);
    res.end();
    event.removeListener('data', () => {});
    event = null;
  });
});


const wss = new Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    if (event) {
      event.emit('data', message);
      console.log('received: ', message);
    }
    console.log(`buyan: ${message}`);
    wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === require('ws').OPEN) {
	    client.send(message);
	}
    });
  });
});

server.listen(ws_port, '0.0.0.0', () => {
  console.log(`Web socket server listening on port ${ws_port}`);
});
