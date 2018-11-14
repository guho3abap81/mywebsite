//defining the variables
const sign = document.querySelector('.sign');
const snowman = document.querySelector('.snowman');
const trace = document.querySelector('.trace');
const tree = document.querySelector('.tree ul');

//start the animation
sign.addEventListener('click',function(){
    snowman.style.animation = 'animate 3s linear forwards'
    trace.style.animation = 'trace 2.8s linear forwards'
    tree.style.animation = 'crash 3s ease-in-out forwards'

//reload animation
setTimeout(function(){
   snowman.style.animation = 'none'
   trace.style.animation = 'none'
   tree.style.animation ='none'}
   ,5000);
  });
