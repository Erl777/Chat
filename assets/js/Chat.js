class Chat {
    constructor(params) {
        const options = params || {};
        this.settings = {

        };
        // Elements
        this.messageInput = document.getElementById('comment');
        this.replySendIcon = document.querySelector('.reply-send');
        this.chatRoom = document.getElementById('conversation');
    }

    init(){
        // Events
        this.replySendIcon.addEventListener('click', this.sendMessage);
        this.messageInput.addEventListener('input', chatEvent.userTyping);
    }

    createMessageTemplate(type, message, name = 'user'){
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

    pasteMessageInChat(message) {
        this.chatRoom.innerHTML += message;
    }

    createMessage(type, message, name) {
        let readyTemplate = this.createMessageTemplate(type, message, name );
        this.pasteMessageInChat(readyTemplate);
    }

    sendMessage = () => {
        let data = {
            name: name,
            message: this.messageInput.value,
        };
        if( this.messageInput.value !== '' ) connection.socket.send(JSON.stringify(data));
        this.messageInput.value = '';
    }

}

let chat = new Chat({});
chat.init();