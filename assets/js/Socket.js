class Socket {
    constructor(params) {
        const options = params || {};
        this.settings = {
            hostname: options.hostname || 'localhost',
            port: options.port || '7000'
        };
        this.socket = null;
    }

    init(){
        // this.socket = new WebSocket("ws://localhost:3003");
        // this.socket = new WebSocket(`ws://${this.settings.hostname}:${this.settings.port}`);
        //
        // this.socket.onopen = function() {
        //     chatEvent.userOnline();
        // };
        //
        // this.socket.onclose = function() {
        //     chatEvent.userOffline();
        // };
        //
        // this.socket.onmessage = function (event) {
        //     let data = JSON.parse(event.data);
        //     // chat.createMessage( 'receiver' , data.message, 'John Doe');
        //     chatEvent.sendMessage(data);
        // };

        setTimeout(()=>{
            this.roomSwitching('room2');
        }, 7000);

        var socket = io.connect(`http://${this.settings.hostname}:${this.settings.port}`);
        this.socket  = socket;
        // var socket = io();

        // on connection to server, ask for user's name with an anonymous callback
        socket.on('connect', function(){

            if(localStorage.getItem('userChatName')){
                socket.emit('adduser', localStorage.getItem('userChatName'));
            }
            else {
                // call the server-side function 'adduser' and send one parameter (value of prompt)
                let name = prompt("What's your name?");
                localStorage.setItem('userChatName', name);
                socket.emit('adduser', name);
            }

        });

        // listener, whenever the server emits 'updatechat', this updates the chat body
        socket.on('updatechat',  (username, data) => {
            // $('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
            console.log('updatechat', username, data);

        });

        // listener, whenever the server emits 'updaterooms', this updates the room the client is in
        socket.on('updaterooms', function(rooms) {
            console.log('updaterooms');
            chat.renderUsers(rooms);
        });


        socket.on('switchRoom', () => {
            console.log('switchRoom');

        });

    }

    roomSwitching(newRoom){
        this.socket.emit('switchRoom', newRoom)
    }

}

let connection = new Socket({
    // hostname: 'online',
    // port: '3003'
});
connection.init();



