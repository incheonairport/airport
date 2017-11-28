/***************
 * Layer Class *
 ***************/

var MobileGnb;

$(function(){

  /**
   * MobileGnb
   */

  MobileGnb = new function(){

    this.mobileOnOffMenu = function( type ){

      if(type=='on'){
        $('.header').animate({left:0},350);
        $('.mobile-header').addClass('active');
      } else {
        $('.header').animate({left: -100 + '%'},350);
        $('.mobile-header').removeClass('active');
      }

    };

  };

});


