const cards = document.querySelectorAll(".memory-card");
const player = document.querySelector(".player-name");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard(){
if(lockBoard) return;
if(this === firstCard) return;
this.classList.add("flip");

 if(!hasFlippedCard){
    //fist click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
    //second click
    secondCard = this;
    checkForMatch();
}

//check if cards match
function checkForMatch(){
  let itsMatch = firstCard.dataset.name === secondCard.dataset.name;
  itsMatch ? disableCards() : unflipCards();
}

//if it is a match
function disableCards(){
  let name = secondCard.dataset.name;
  player.innerHTML = name;
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  player.classList.add("active");
  resetBoard();
  setTimeout(gameFinished,1000);
  setTimeout(()=>{
  player.classList.remove("active");
  },2000)
}

//if there is no match
function unflipCards(){
  lockBoard = true;
  setTimeout(()=>{
  firstCard.classList.remove("flip");
  secondCard.classList.remove("flip");
  resetBoard();
},500)
}

function resetBoard(){
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard ] = [null, null];
}

function gameFinished(){
let Flipped =[];
const cards = document.querySelectorAll(".memory-card");

  for(let i = 0; i <= cards.length; i++){
     const cards = document.querySelectorAll(".memory-card");
     if(cards[i].classList.contains('flip')){
     Flipped.push(cards[i]);
    }
      if(Flipped.length === cards.length){
        document.querySelector('.overlay').classList.add("active");
         }
      }
};

(function shuffle(){
cards.forEach(card => {
let randomPos = Math.floor(Math.random()*32) ;
card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener("click",flipCard))
