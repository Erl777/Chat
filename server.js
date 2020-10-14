var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: '3003'});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    })
};

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        // console.log(wss.clients);
        // console.log('received: %s,', message);
        wss.clients.forEach(function each(client) {
            client.send(message);
        });
    });

    // let data = {
    //     name: 'User3',
    //     message: 'Hello',
    //     img: 'assets/img/avatar3.png',
    // };
    //
    // ws.send(JSON.stringify(data));
});