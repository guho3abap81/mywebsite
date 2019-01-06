const slider = document.querySelector(".slider");
const items = slider.querySelectorAll(".item")
const pointer = document.querySelector(".pointer");
const arrows = document.querySelectorAll(".arrow");

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown",clickOnSlider);

function clickOnSlider(e){
  isDown = true;
  showPointer(e);
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  arrows.forEach(arrow => arrow.classList.add("active"));
  slider.classList.add("active");
  setTimeout(()=>{
     pointer.classList.remove("active")
   },700);
};

slider.addEventListener("mouseleave",() => {
isDown = false;
slider.classList.remove("active");
arrows.forEach(arrow => arrow.classList.remove("active"));
});

slider.addEventListener("mouseup",() => {
isDown = false;
slider.classList.remove("active");
arrows.forEach(arrow => arrow.classList.remove("active"));
});

slider.addEventListener("mousemove",(e) => {
  if(!isDown) return; //stop the function from running
  e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX)*3;
      console.log(walk);
      slider.scrollLeft = scrollLeft - walk;
      //slider.style.transform = "scale(${walk})"
});

function showPointer(e){
  const leftPos = e.pageX;
  const topPos = e.pageY;
  const halfWidth = pointer.offsetWidth/2;
  const halfHeight = pointer.offsetHeight/2;
  pointer.style.left = `${leftPos - halfWidth}px`;
  pointer.style.top = `${topPos - halfHeight}px`;
  pointer.classList.add("active");
}
/////////////////////////
function generateHTML(limit,i){
return`<div class="item item ${i}">
<img src="https://source.unsplash.com/random/400x4${randomNumber(9)}${randomNumber(9)}"></div>`
}

function randomNumber(limit){
return Math.floor(Math.random()* limit) + 1;
}

const digits = Array.from({length: 30});
const html = digits.map(generateHTML).join('');
//console.log(digits);
slider.innerHTML = html;
