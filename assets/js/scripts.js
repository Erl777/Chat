
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


// Mobile menu

let toggler = document.querySelector('.js-toggle');
let mobileMenu = document.querySelector('.mobile-chat');

if(toggler) toggler.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
    mobileMenu.classList.toggle('hide');
    toggler.classList.toggle('closed');
}