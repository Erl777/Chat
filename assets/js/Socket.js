class Socket {
    constructor(params) {
        const options = params || {};
        this.settings = {

        };
        // this.socket = new WebSocket("ws://localhost:3001");
    }
}

// Elements
let messageInput = document.getElementById('comment');
let replySendIcon = document.querySelector('.reply-send');
let chatRoom = document.getElementById('conversation');

// Events
replySendIcon.addEventListener('click', sendMessage);

function printMessage(val){
    console.log(val);
}

function createMessageTemplate(type, message, name = 'user'){
    let string = '';
    if (type === 'system'){
        string = templates.system.replace('{message}', message);
    }
    if (type === 'receiver'){
        string = templates.receiver.replace('{message}', message).replace('{name}', name);
    }
    if (type === 'sender'){
        string = templates.sender.replace('{message}', message).replace('{name}', name);
    }
    return string;
}

function pasteMessageInChat(message) {
    chatRoom.innerHTML += message;
}

function createMessage(type, message, name) {
    let readyTemplate = createMessageTemplate(type, message, name );
    pasteMessageInChat(readyTemplate);
}

function sendMessage() {
    if( messageInput.value !== '' ) socket.send(messageInput.value);
    console.log('Sent');
    messageInput.value = '';
}

let socket = new WebSocket("ws://localhost:3001");

socket.onopen = function(e) {
    console.log("Соединение установлено");
    createMessage('system', 'You are Online');
};

socket.onclose = function(e) {
    console.log("Соединение закрыто");
};

// socket.onmessage = response => printMessage(response.data);
socket.onmessage = response => createMessage( 'receiver' , response.data, 'user1');