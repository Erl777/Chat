class Chat {
    constructor(params) {
        const options = params || {};
        this.settings = {

        };
        this.users = {
            user1:{
                img: 'assets/img/avatar1.png',
                name: 'User1'
            },
            user2:{
                img: 'assets/img/avatar2.png',
                name: 'User2'
            },
            user3:{
                img: 'assets/img/avatar3.png',
                name: 'User3'
            }
        };
        // Elements
        this.messageInput = document.getElementById('comment');
        this.replySendIcon = document.querySelector('.reply-send');
        this.chatRoom = document.getElementById('conversation');
        this.mobileChat = document.querySelector('.mobile-chat > .mobile-chat-body');
        this.sideBar = document.querySelector('.sideBar');
        this.typingIcon = document.querySelector('.tiblock');
        this.headingImage = document.querySelector('.heading-avatar-icon > img');
        this.headingName = document.querySelector('.heading-name-meta');
    }

    init(){
        // Events
        console.log('Chat was initialized');
        this.replySendIcon.addEventListener('click', this.sendMessage);
        this.messageInput.addEventListener('focus', chatEvent.userTyping);
        this.messageInput.addEventListener('blur', chatEvent.resetUserTyping);
        // Проверка нажатия Enter или Shift + Enter
        this.messageInput.addEventListener('keypress', (e) => {
            this.keyDown(e)
        });

        this.renderUsers(this.users);
        // Тестовый прогон поднятия пользователя
        setTimeout(()=>{
            this.moveUserToTop('User3');
            this.changeSender('User3');
        }, 3000);
    }

    sendMessage = () => {
        let data = {
            name: 'User',
            message: this.messageInput.value,
        };
        if( this.messageInput.value !== '' ) connection.socket.send(JSON.stringify(data));
        this.messageInput.value = '';
    };

    moveUserToTop(name){
        let userBody = document.querySelector(`[data-user=${name}`).outerHTML;
        this.sideBar.querySelector(`[data-user=${name}`).remove();
        this.sideBar.innerHTML = userBody + this.sideBar.innerHTML;

        let userBodyBlock = document.querySelector(`[data-user=${name}`);
        this.addAnimation('anim1', userBodyBlock, 5000);
    }

    addAnimation(name, block, removeAfter){
        block.classList.add(name);
        setTimeout( () => {
            block.classList.remove(name);
        }, removeAfter);
    }

    renderUsers(obj){
        let string = '';
        for(let key in obj){
            string += templates.sidebarUser.replace('{img}', obj[key].img).replace('{name}', obj[key].name).replace('{name}', obj[key].name);
        }
        this.sideBar.innerHTML = string;
    }

    typingIndication(str){
        str === 'on' ? this.typingIcon.classList.add('show-typing') : this.typingIcon.classList.remove('show-typing')
    }

    changeSender(userName){
        for (let key in this.users) {
            if (this.users[key].name === userName){
                this.headingImage.src = this.users[key].img;
                this.headingName.textContent = this.users[key].name;
            }
        }

    }

    keyDown(e){
        // Enter + Shift
        if (e.keyCode == 13 && e.shiftKey) {
            this.pasteIntoInput(e.target);
            e.preventDefault();
        }
        // Enter
        if (e.keyCode == 13 && !e.shiftKey) {
            this.typingIndication('off');
            e.preventDefault();
            this.sendMessage();
        }
    }

    pasteIntoInput(elem){
        elem.value += '\n';
    }

}

let chat = new Chat({});
chat.init();