class Socket {
    constructor(params) {
        const options = params || {};
        this.settings = {
            hostname: options.hostname || 'localhost',
            port: options.port || '3000'
        };
        this.socket = null;
    }

    init(){
        // this.socket = new WebSocket("ws://localhost:3003");
        this.socket = new WebSocket(`ws://${this.settings.hostname}:${this.settings.port}`);

        this.socket.onopen = function() {
            chatEvent.userOnline();
        };

        this.socket.onclose = function() {
            chatEvent.userOffline();
        };

        this.socket.onmessage = function (event) {
            let data = JSON.parse(event.data);
            // chat.createMessage( 'receiver' , data.message, 'John Doe');
            chatEvent.sendMessage(data);
        };
    }
}

let connection = new Socket({
    // hostname: 'online',
    port: '3003'
});
connection.init();



