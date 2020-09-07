class Events {
    constructor(params) {
        const options = params || {};
        this.settings = {

        };
    }

    userOnline(){
        chat.createMessage('system', 'You are Online');
    }

    userOffline(){
        chat.createMessage('system', 'You are Offline');
    }

    userTyping(){
        console.log('user is typing');
    }

    sendMessage(data){
        chat.createMessage( 'receiver' , data.message, 'John Doe');
    }

    moveToTop(){

    }

}

let chatEvent = new Events({});