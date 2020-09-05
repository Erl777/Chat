
// Sidebar

let headingCompose = document.querySelector('.heading-compose');
let newMessageBack = document.querySelector('.newMessage-back');
let sideTwo = document.querySelector('.side-two');

headingCompose.addEventListener('click', function () {
    sideTwo.style.left = '0';
});

newMessageBack.addEventListener('click', function (){
    sideTwo.style.left = '-100%';
});

//---------------------------
