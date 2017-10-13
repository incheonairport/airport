$(function(){

  // function
  function tabAction(){
    var tabWidth = 0;
    var $tabWrap;

    try{
      $tabWrap = $('.tab-nav');

      $tabWrap.each(function(){

        tabWidth = 100 / $(this).find('.tab-nav-list-item').length;

        $(this).find('.tab-nav-list-item').css({
          width: tabWidth + '%'
        });

      });

    } catch(e){}

    try{

      $tabWrap = $('.tab-area');

      $tabWrap.each(function(){

        tabWidth = 100 / $(this).find('.tab-area-heading').length;

        $(this).find('.tab-area-heading').css({
          width: tabWidth + '%'
        });

        $(this).find('.tab-area-heading').each(function(i){
          $(this).css({
            left : (i * tabWidth) + '%'
          });
        });

      });


    } catch(e) {}

    $('.tab-area-heading').on('click', function(){

      $(this).siblings('.tab-area-heading').removeClass('on').next('.tab-area-content').removeClass('on');

      $(this).addClass('on').next('.tab-area-content').addClass('on')

    });
  }

  // run
  tabAction();


});