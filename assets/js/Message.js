class Message {
    constructor(type, content, name) {
        this.type = type;
        this.content = content;
        this.name = name;
    }
    createAndSendMessage(){
        this.pasteMessageInChat(this.generateMessageTemplate())
    }
    pasteMessageInChat(message){
        chat.chatRoom.innerHTML += message;
    }
}

class MessageFactory {
    create(type, content, name){
        if (type === 'system'){
            return new SystemMessage(type, content, name);
        }
        if (type === 'receiver'){
            return new ReceiverMessage(type, content, name);
        }
        if (type === 'sender'){
            return new SenderMessage(type, content, name);
        }
    }
}

class SystemMessage extends Message{

    generateMessageTemplate(){
        return templates.system.replace('{message}', this.content);
    }

}

class ReceiverMessage extends Message{

    generateMessageTemplate(){
        return  templates.receiver.replace('{message}', this.content).replace('{name}', this.name);
    }

}

class SenderMessage extends Message{

    generateMessageTemplate(){
        return  templates.sender.replace('{message}', this.content).replace('{name}', this.name);
    }

}

const factory = new MessageFactory();

let m1 = factory.create('system', 'SUCCESS');
let m2 = factory.create('receiver', 'Hello comrade', 'User');
let m3 = factory.create('sender', 'I am fine. What about you?', 'Me');
setTimeout(() =>{
    m1.createAndSendMessage();
    m2.createAndSendMessage();
    m3.createAndSendMessage();
}, 3000)


