/******************
 * Base Execution *
 ******************/

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

  // 출발 시간표 상세보기 열기
  $('.flight-info-basic-link').on('click', function(e){

    e.preventDefault();

    var $thisFlightInfoDetail = $(this).parent().next();

    if( $thisFlightInfoDetail.data().open == false ){

      TableLike.openInfoDetail( $thisFlightInfoDetail );

    }

  });

  // 출발 시간표 상세보기 닫기
  $('.flight-info-detail-close').on('click', function(e){

    e.preventDefault();

    var $thisFlightInfoDetail = $(this).parents('.flight-info-detail');

    TableLike.closeInfoDetail( $thisFlightInfoDetail );

  });

  // 공유하기 보기
  $('.flight-info-detail-share').on('click', function(e){

    e.preventDefault();

    TableLike.openInfoDetailShare( $(this).next('.td-pop') );

  });

  // 공유하기 닫기
  $('.td-pop-close-btn').on('click', function(e){

    e.preventDefault();

    TableLike.closeInfoDetailShare( $(this).parent('.td-pop') );

  });


  // 운항속보 SMS Layer Popup
  $('.btn-newsflash').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();

    LayerPopup.openPopup( $('.flight-sms-01') );

  });

  // 운항속보 SMS 다음 단계 Ppoup
  $('.js-next').on('click', function(e){

    e.preventDefault();

    LayerPopup.nextPopup( $(this).parents('.layer'), $(this).parents('.layer').next('.layer') );

  });


  // Layer Popup 닫기
  $('.layer-close').on('click', function(){

    LayerPopup.closePopup( $(this).parent('.layer') );

  });

});


