
//getting DOM Elements

const gallery = document.querySelector(".gallery");
const overlay = document.querySelector(".overlay");
const overlayInner = document.querySelector(".overlay-inner")
const overlayImage = document.querySelector("img");
const overlayClose = document.querySelector(".close");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

//GETTING RANDOM NUMBERS BETWEEN 1 AND THE LIMIT
function randomNumber(limit){
    return Math.floor(Math.random()* limit) + 1;
}

//CREATE DIV FOR EVERY IMAGE
function generateHTML([h,v]){
return `<div class="item h${h} v${v}">
        <img src="https://source.unsplash.com/random/404x4${randomNumber(9)}${randomNumber(9)}">
        <div class="item-overlay">
        <button>VIEW</button>
          </div>
        </div>`;
}

//SHOW CLICKED IMAGE
function handleClick(e){
  overlay.classList.add("open");
  overlayInner.classList.add("open");
  const firstImage = document.querySelector(".gallery > div:first-of-type img");
  const lastImage = document.querySelector(".gallery > div:last-of-type img");
  let currentImage = e.currentTarget.querySelector("img");
  let prevImage;
  let nextImage;
  overlayImage.src = currentImage.src;

    //change to previous image
    arrowLeft.addEventListener("click", function(){

        if(currentImage === firstImage){
              overlayImage.src = lastImage.src;
              currentImage = lastImage;
         }else{
              prevImage = currentImage.parentElement.previousElementSibling.querySelector("img");
              overlayImage.src = prevImage.src;
              currentImage = prevImage;
         }

      });

     //change to next image
      arrowRight.addEventListener("click",  function(){

        if(currentImage === lastImage){
              overlayImage.src = firstImage.src;
              currentImage = firstImage;
        }else{
              nextImage = currentImage.parentElement.nextElementSibling.querySelector("img");
              overlayImage.src = nextImage.src;
              currentImage = nextImage;
         }

      });
};

//close the images
function close(){
    overlay.classList.remove("open");
    overlayInner.classList.remove("open");
}


//CREATE ARRAYS WITH RANDOM VALUES
const numbers = Array.from({length:25},()=> [randomNumber(3),randomNumber(3)]);

//maping over the array and generate images with random h and v classes
const html = numbers.map(generateHTML).join('');

//put the Array images into the Gallery container
gallery.innerHTML = html;

const items = document.querySelectorAll(".gallery .item");
//gallery.addEventListener("click",handleClick);

///////////////////////////////////////////////////////////////////////////////

//ADDING EVENT LISTENERS
items.forEach(item => item.addEventListener("click",handleClick));
//complete the gallery by adding new images
function addExtraItems(){

  let gWidth = gallery.offsetWidth;
  let gHeight = gallery.offsetHeight;
  //calculating gallery surface
  let gArea = gWidth* gHeight;
  let newItems = [...items];
  //callculating surface of the existing images
  const itemsArea = newItems.reduce((total,item) => total +(item.offsetWidth * item.offsetHeight),0);
  //calculate how many images we need
  let freeSpace = (gArea - itemsArea)/10000;
  //create an array consisting the extra items
  const extraDigits = Array.from({length:freeSpace},()=>[1,1]);
  //mapping over the array to return div element for each of them
  let addhtml = extraDigits.map(generateHTML).join('');
  //adding them to the existing html
  gallery.insertAdjacentHTML("beforeend", addhtml);
  //adding eventlistener to the new items
  gallery.querySelectorAll(".item").forEach(item => item.addEventListener("click",handleClick));
}
addExtraItems();

overlayClose.addEventListener("click",close);

//overlay.addEventListener("click",close);

document.body.addEventListener("keydown",function(e){
  if(e.code === "Escape"){
    close();
     }
});
