var express = require('express')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , io = require('socket.io')(server);

// const express = require('express'),
//     app = express(),
//     http = require('http').createServer(app),
//     io = require('socket.io')(http);

const host = 'localhost';
const port = 7000;

app.use(express.static(__dirname + '/assets'));
// app.use(function (req, res, next) {
//
//     // Website you wish to allow to connect
//     res.header('Access-Control-Allow-Origin', '*');
//
//     // Request methods you wish to allow
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', false);
//
//     // Pass to next layer of middleware
//     next();
// });

// server.listen(port, function(){
//     console.log(`Сервер ожидает подключения... http://localhost:${port}`);
// });

const users = {
    user1:{
        img: '/img/avatar1.png',
        name: 'User1'
    },
    user2:{
        img: '/img/avatar2.png',
        name: 'User2'
    },
    user3:{
        img: '/img/avatar3.png',
        name: 'User3'
    }
};


// routing
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1','room2','room3'];

io.sockets.on('connection', function (socket) {

    // when the client emits 'adduser', this listens and executes
    socket.on('adduser', function(username){
        // store the username in the socket session for this client
        socket.username = username;
        // store the room name in the socket session for this client
        socket.room = 'room1';
        // add the client's username to the global list
        usernames[username] = username;
        // send client to room 1
        socket.join('room1');
        // echo to client they've connected
        socket.emit('updatechat', 'SERVER', 'you have connected to room1');
        // echo to room 1 that a person has connected to their room
        socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
        socket.emit('updaterooms', users);
    });

    // when the client emits 'sendchat', this listens and executes
    socket.on('sendchat', function (data) {
        // we tell the client to execute 'updatechat' with 2 parameters
        io.sockets.in(socket.room).emit('updatechat', socket.username, data);
    });

    socket.on('switchRoom', function(newroom){
        // leave the current room (stored in session)
        console.log(socket.room);
        socket.leave(socket.room);
        // join new room, received as function parameter
        socket.join(newroom);
        //socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
        // sent message to OLD room
        //socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
        // update socket session room title
        socket.room = newroom;
        //socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
        socket.emit('updaterooms', users);
        console.log(socket.room);
    });


    // when the user disconnects.. perform this
    socket.on('disconnect', function(){
        // remove the username from global usernames list
        delete usernames[socket.username];
        // update list of users in chat, client-side
        io.sockets.emit('updateusers', usernames);
        // echo globally that this client has left
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        socket.leave(socket.room);
    });
});

server.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));
