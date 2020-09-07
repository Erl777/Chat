var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: '3003'});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    })
};

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log(wss.clients);
        console.log('received: %s,', message);
        wss.clients.forEach(function each(client) {
            client.send(message);
        });
    });

    // ws.send('something');
});


// const WebSocket = require('ws');

// const server = new WebSocket.Server({ port: 3003 });

// server.on('connection', ws => {
//   ws.send('Hello comrade');
//
//   ws.on('message', message =>{
//     // console.log(message);
//     server.clients.forEach( client => {
//       if( client.readyState === WebSocket.OPEN ) client.send(message);
//     } )
//   })
//
// });

// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 3003 });
// wss.on('connection', function connection(ws, req) {
//   ws.send('Hello comrade');
//   console.log('connected: '+req.connection.remoteAddress);
//
//   ws.on('message', function incoming(message) {
//     console.log('received from %s: %s', req.connection.remoteAddress, message);
//     // do stuff with the message
//   });
//
// });
