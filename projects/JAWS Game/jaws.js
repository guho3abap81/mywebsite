//selecting dom elements
const sharks = document.querySelectorAll(".shark");
const waves = document.querySelectorAll(".wave");
const barrel = document.querySelector(".barrel");
const game = document.querySelector(".game");
const scoreBoard = document.querySelector(".score");
const timer = document.querySelector(".timer");
const button = document.querySelector(".start");
const overlay = document.querySelector(".overlay");
const result = document.querySelector(".overlay .hits");
const container = document.querySelector(".container");
let lastWave;
let timeUp = false;
let score = 0;
let cowntDown;
let timeleft = 20;
let gameDuration = 20000;

//create our functioncs

function randomTime(min,max){
return Math.round(Math.random()*(max - min) + min) ;
}

function randomWave(waves){
const idx = Math.floor(Math.random() * waves.length);
const wave = waves[idx];

if(wave == lastWave){
      console.log("It's the same one!")
      return randomWave(waves);
      }
lastWave = wave;
return wave;
}

function show(){
const time = randomTime(1000,1500);
const wave = randomWave(waves);
wave.classList.add("up");
  setTimeout(()=>{
    wave.classList.remove("up");
    if(!timeUp) show();
  },time);
}

function moveBarrel(e){
  const leftPos = e.pageX - container.offsetLeft;
  const topPos = e.pageY - container.offsetTop;
  const halfWidth = barrel.offsetWidth;
  const halfHeight = barrel.offsetHeight/2;
  barrel.style.left = `${leftPos}px`;
  barrel.style.top = `${topPos - halfHeight}px`;
}

function startGame(){
overlay.classList.remove("active");
game.addEventListener("mousemove",moveBarrel);
button.removeEventListener("click",startGame);
button.style.display = "none";
scoreBoard.textContent = 0;
timeUp = false;
score = 0;
timeleft = 20;
show();
  cowntDown = setInterval(()=>{
    timer.innerHTML = timeleft--;
    if(timeleft < 0){
    overlay.classList.add("active");
  //  result.textContent = `HITS  ${score}`;
    button.addEventListener("click",startGame);
    clearInterval(cowntDown);
       }
  },1000);
setTimeout(() => timeUp = true,gameDuration);
}

function hit(e){
if (!e.isTrusted) return;
score++;
once = false;
sharks.forEach(shark => shark.style.backgroundImage = "url('images/shark-barrel.png')");
barrel.style.display = "none";
scoreBoard.textContent = score;

setTimeout(()=> sharks.forEach(shark => shark.style.backgroundImage = "url('images/shark.png')"),700);
setTimeout(()=> barrel.style.display = "block",800);

}
//fire the events
sharks.forEach(shark => shark.addEventListener("click",hit))

button.addEventListener("click",startGame)
