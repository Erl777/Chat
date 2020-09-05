class Socket {
    constructor(params) {
        const options = params || {};
        this.settings = {
            // socket: new WebSocket("ws://js.info"),
        };
    }
}

let socket = new WebSocket("ws://js.info");

socket.onopen = function(e) {
    alert("Соединение установлено");
};