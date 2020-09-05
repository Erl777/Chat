const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3001 });

server.on('connection', ws => {
  ws.send('Hello user');
})
