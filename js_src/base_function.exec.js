$(function(){

  /**
   * loading
   */


  /**
   * event
   */

  $('.gnb-depth1-link').on('mouseenter', function(){
    $('.gnb').addClass('on');
  });

  $('.gnb').on('mouseleave', function(){
    $('.gnb').removeClass('on');
  });

});