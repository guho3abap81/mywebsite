//debounce function
function debounce(func, wait = 10, immediate = true){
  var timeout;
  return function(){
    var context = this, args = arguments;
    var later = function(){
      timeout = null;
      if(!immediate) func.apply(context,args);
      };

  var callNow = immediate && !timeout;
  clearTimeout(timeout);
  timeout = setTimeout(later,wait);
  if (callNow) func.apply(context,args);
  };
};


//SCROLL INDICATOR FUNCTION
function scrollIndicator(){
  const percent = document.querySelector(".percent");
  let docSize = document.body.scrollHeight;
  const winSize = window.innerHeight;
  const scrollBar = document.querySelector(".scrollbar");
  const winTop = window.scrollY;

  let scrolled = (winTop/(docSize - winSize))*100;

  scrollBar.style.width = `${scrolled}%`;
  percent.textContent = Math.round(scrolled)+'%';
}


//SLIDE IN FUNCTION

const sliders = document.querySelectorAll(".slide");

function checkForScroll(e){

    sliders.forEach(slide => {

      const topPos = slide.offsetTop;

      if(window.scrollY > topPos - 150){
        slide.classList.add("active")
      }else{
        slide.classList.remove("active")
      }

    })

};


window.addEventListener("scroll",debounce(checkForScroll));
window.addEventListener("scroll",scrollIndicator);
window.addEventListener("resize",scrollIndicator);
