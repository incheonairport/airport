var LayerPopup;

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
 * CalendarPopup Class
 */

/**
 * showHide Class ?
 */

$(function(){

  /**
   * LayerPopup Class
   */

  LayerPopup = new function(){

    var $layerWrap = $('.layer-wrap');

    this.openPopup = function( $popupName ){

      $layerWrap.addClass('on');
      $popupName.addClass('on');

    };

    this.closePopup = function( $popupName ){

      $layerWrap.removeClass('on');
      $popupName.removeClass('on');

    };

    this.nextPopup = function( $currentPopup, $nextPopup ){

      $currentPopup.removeClass('on');
      $nextPopup.addClass('on');

    }


  };

});