class Events {
    constructor(params) {
        const options = params || {};
        this.settings = {

        };
    }

    userOnline(){
        let message = factory.create('system', 'You are Online');
        message.createAndSendMessage();
        // chat.createMessage('system', 'You are Online');
    }

    userOffline(){
        let message = factory.create('system', 'You are Offline');
        message.createAndSendMessage();
    }

    userTyping(){
        chat.typingIndication('on')
    }

    resetUserTyping(){
        chat.typingIndication('off')
    }

    sendMessage(data){
        // chat.createMessage( 'receiver' , data.message, 'John Doe');
        let message = factory.create('sender' , data.message, getCurrentTime());
        message.createAndSendMessage();
    }

    moveUserToTop(){

    }

}

let chatEvent = new Events({});