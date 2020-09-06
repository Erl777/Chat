const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3001 });

server.on('connection', ws => {
  ws.send('Hello comrade');

  ws.on('message', message =>{
    console.log(message);
    server.clients.forEach( client => {
      if( client.readyState === WebSocket.OPEN ) client.send(message);
    } )
  })

})
