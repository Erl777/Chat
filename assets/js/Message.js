class Message {
    constructor(type, content, time) {
        this.type = type;
        this.content = content;
        this.time = time;
    }
    createAndSendMessage(){
        this.pasteMessageInChat(this.generateMessageTemplate());
        this.pasteMessageInMobileChat(this.generateMessageTemplate());
    }
    pasteMessageInChat(message){
        chat.chatRoom.innerHTML += message;
    }
    pasteMessageInMobileChat(message){
        chat.mobileChat.innerHTML += message;
    }
}

class MessageFactory {
    create(type, content, time = getCurrentTime()){
        if (type === 'system'){
            return new SystemMessage(type, content, time);
        }
        if (type === 'receiver'){
            return new ReceiverMessage(type, content, time);
        }
        if (type === 'sender'){
            console.log(content)
            return new SenderMessage(type, content, time);
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
        return  templates.receiver.replace('{message}', this.content).replace('{time}', this.time);
    }

}

class SenderMessage extends Message{

    generateMessageTemplate(){
        return  templates.sender.replace('{message}', this.content).replace('{time}', this.time);
    }

}

function getCurrentTime() {
    let time = new Date();
    return time.getHours() + ':' + time.getMinutes();
}

const factory = new MessageFactory();

// factory.create('system', 'SUCCESS').createAndSendMessage();
// let m2 = factory.create('receiver', 'Hello comrade. How are you?', getCurrentTime());
// let m3 = factory.create('sender', 'I am fine. What about you?', getCurrentTime());
// setTimeout(() =>{
//     // m1.createAndSendMessage();
//     m2.createAndSendMessage();
//     m3.createAndSendMessage();
// }, 1500);


