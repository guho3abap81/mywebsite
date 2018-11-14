//Responsive NAV
$(function(){
 menu = $('#navbar ul');

    $("#openup").on("click",function(e){
      e.preventDefault();
      menu.slideToggle();
    });

    $(window).resize(function(){
       var w = $(this).width();
      if(w > 480 && menu.is(':hidden')){
        menu.removeAttr('style');
        }
    });

    $('nav li').on('click', function(e){
       var w = $(window).width();
        if( w < 480 ){
          menu.slideToggle();
        }
    });

    //$('.open-menu').height($(window).height());

});

//smooth scroll
var clicked = $('.menu a');
var navBar = $("#navbar").outerHeight();

clicked.click(function(e){
    e.preventDefault();
    //animate body to  section +clicked hashtag position;
    $('html, body').animate({
    scrollTop: $(this.hash).offset().top - navBar},800);
});

/////////////////////////
