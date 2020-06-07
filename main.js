const openMenu = document.querySelector("#openup");
const menu = document.querySelector(".menu");
const hamburgerIcon = "&#9776;";
const closeIcon = "&#9932;";
const links = document.querySelectorAll("#navbar ul li a");

openMenu.addEventListener("click", ()=>{
      menu.classList.toggle("active");

    if(menu.classList.contains("active")){
      openMenu.innerHTML = closeIcon;
      }else{
      openMenu.innerHTML = hamburgerIcon;
     }
});

links.forEach(link => link.addEventListener("click", ()=>  {
    menu.classList.remove("active")
    openMenu.innerHTML = hamburgerIcon
  })
  );
