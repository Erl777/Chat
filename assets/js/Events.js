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
        console.log('user is typing');
    }

    sendMessage(data){
        // chat.createMessage( 'receiver' , data.message, 'John Doe');
        let message = factory.create('receiver' , data.message, 'John Doe');
        message.createAndSendMessage();
    }

    moveToTop(){

    }

}

let chatEvent = new Events({});