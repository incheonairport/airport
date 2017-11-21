/****************
 * Common Class *
 ****************/

var LayerPopup, CalendarPopup;

$(function(){

  /**
   * VendorDevice Class
   */

  /**
   * LineTab Class
   */

  /**
   * SelectBox Class
   */

  /**
   * showHide Class ?
   */

  /**
   * LayerPopup Class
   */

  LayerPopup = new function(){

    var $layerWrap = $('.layer-wrap');

    this.openPopup = function( $popupName ){

      $('html, body').addClass('open-layer');
      $layerWrap.addClass('on');
      $popupName.addClass('on');

    };

    this.closePopup = function( $popupName ){

      $('html, body').removeClass('open-layer');
      $layerWrap.removeClass('on');
      $popupName.removeClass('on');

    };

    this.nextPopup = function( $currentPopup, $nextPopup ){

      $currentPopup.removeClass('on');
      $nextPopup.addClass('on');

    }

  };

  /**
   * CalendarPopup Class
   */

  CalendarPopup = new function(){

    // call jquery-ui api when loading
    $('.timesetting-date-day').datepicker({
      showMonthAfterYear : true,
      showOtherMonths : true,
      selectOtherMonths : true,

      prevText : 'p',
      nextText : 'n',
      dayNames : ['월', '화', '수', '목', '금', '토', '일' ],
      dayNamesMin : ['월', '화', '수', '목', '금', '토', '일' ],
      dayNamesShort : ['월', '화', '수', '목', '금', '토', '일' ],
      monthNames : ['. 1', '. 2', '. 3', '. 4', '. 5', '. 6', '. 7', '. 8', '. 9', '. 10', '. 11', '. 12']
    });

    this.showDatePicker = function(type){

      $('.timesetting-date-day').datepicker(type);

    }

  };

});


