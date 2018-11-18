//selecting DOM elements
const board = document.querySelector(".gameboard");
const user = document.querySelector(".user > img");
const comp = document.querySelector(".computer > img");
const choices = document.querySelectorAll(".choice");
const shake = document.querySelectorAll(".action img");
const counter = document.querySelector(".counter > span");
const overlay = document.querySelector(".overlay");
const message = document.querySelector(".message");
const end = document.querySelector(".endGame");
const startBtn = document.querySelector(".start");
const goalInput = document.querySelector("#finalGoal");


let userWin = 0;
let computerWin = 0;
let user_score = document.querySelector("#userScore");
let comp_score = document.querySelector("#computerScore");
let result = document.querySelector(".game-result > p");
let Playing = false;
let num = 3;

//getting random choice for the computer
function getComputerChoice(){
  const choices = ["R","S","P"];
  let randomNumber = Math.floor(Math.random()*3);
  return choices[randomNumber];
};

function getInput(){
  let goal = goalInput.value;

  if(!goal || goal < 1){
      alert("Please, enter number bigger than 0!");
            return;
    }else{
      end.textContent = goal;
      sessionStorage.setItem("goal",goal);
      startGame();
       }

};
//executes if user wins
function win(userChoice, computerChoice){
    userWin++;
    user_score.innerHTML = userWin;
    result.innerHTML = `${convertToWord(userChoice)} Beats ${convertToWord(computerChoice)}. You Won!`
    setTimeout(() => board.classList.add("green-glow"),100);
    setTimeout(() => board.classList.remove("green-glow"),700);
}

//executes if user loses
function lost(userChoice, computerChoice){
    computerWin++;
    comp_score.innerHTML = computerWin;
    result.innerHTML = `${convertToWord(userChoice)} Loses To ${convertToWord(computerChoice)}, You Lost!`;
    setTimeout(() => board.classList.add("red-glow"),100);
    setTimeout(() => board.classList.remove("red-glow"),700);
}

//executes if it is a draw
function draw(userChoice, computerChoice){
    user_score.innerHTML = userWin;
    comp_score.innerHTML = computerWin;
    result.innerHTML = `${convertToWord(userChoice)} Is Equal To ${convertToWord(computerChoice)}. It Is A Draw!`;
    setTimeout(() => board.classList.add("grey-glow"),100);
    setTimeout(() => board.classList.remove("grey-glow"),700);
}

//counting down
function countDown(){
  let c = 2;
  counter.style.display = "block";
  i = setInterval(function(){
    counter.innerHTML = c;
    c--;
   if(c < 0){
      clearInterval(i);
      counter.style.display = "none";
     }
 },1000);
counter.innerHTML = 3;
};

//clears the gameboard
function play(){
  Playing = true;
  countDown();
  user.src = "images/hand-rock.png";
  comp.src = "images/hand-rock.png";
  result.innerHTML = "SHAKING..."
  shake.forEach((img) => img.classList.add("active"));
}

function game(userChoice){
shake.forEach( img => img.classList.remove("active"));
const computerChoice = getComputerChoice();

//change images depending on the choices
handChange(user,userChoice);
handChange(comp,computerChoice);
//console.log(userChoice, computerChoice)
    switch(userChoice + computerChoice){
      case "RS":
      case "SP":
      case "PR":
      win(userChoice, computerChoice);
      //console.log("USER WINS!");
      break;
      case "RP":
      case "SR":
      case "PS":
    //  console.log("COMPUER WINS!")
      lost(userChoice, computerChoice)
      break;
      case "RR":
      case "SS":
      case "PP":
      draw(userChoice, computerChoice);
    //  console.log("IT'S A DRAW!")
      break;
    }
  Playing = false;
  choices.forEach(choice => choice.classList.remove("active"));
  setTimeout(() => endGame(), 1000);
};

//changes images
function handChange(player, choice){

  if (choice === "S"){
    player.src = "images/hand-scissors.png";
  }else if(choice === "P") {
    player.src = "images/hand-paper.png";
  }
};

//checking if the game has finished
function endGame(){

num = sessionStorage.getItem("goal");

  if(userWin == num || computerWin == num){
    overlay.classList.add("active");

      if(userWin == num){
          message.innerHTML = `Congratulations! You Are The Winner!`;
      }else{
          message.innerHTML = `You Lost! Computer Is The Winner!`;
        }
    }
};

//start the game again
function startGame(){
  userWin = 0;
  computerWin = 0;
  user_score.innerHTML = userWin;
  comp_score.innerHTML = computerWin;
  overlay.classList.remove("active");
}

//convert the choice from a letter to word
function convertToWord(letter){
  if(letter === "R") return "ROCK";
  if(letter === "S") return "SCISSORS"
  return "PAPER";
}

//adding eventlisteners
choices.forEach(choice => choice.addEventListener("click", function(){

    if(!Playing){
      let makeChoice = this.dataset.choice;
      this.classList.add("active");
      play();
      setTimeout(() => game(makeChoice),3000);
      }
   })
);

//start the game again
//startBtn.addEventListener("click", startGame);
startBtn.addEventListener("click", getInput);
