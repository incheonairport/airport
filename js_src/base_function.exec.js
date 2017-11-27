/******************
 * Base Execution *
 ******************/

$(function(){

  /**
   * loading
   */

  // set full page
  if( FullPage.$mainFullPageContent.length > 0 ){

    FullPage.sectionBgInit();

    FullPage.$mainFullPageContent.fullpage({
      //scrollBar: true,
      scrollingSpeed: 1000,

      afterLoad: function(anchor, firstSectionIndex){

        HeaderGnb.setClass(firstSectionIndex-1, MainVisual.getNextVisualIndex());

      },

      onLeave: function(currentSectionIndex, nextSectionIndex, direction){

        if( direction == 'down' ){

          FullPage.sectionBgDown(nextSectionIndex-1);

        } else {

          FullPage.sectionBgUp(currentSectionIndex-1);

        }

        HeaderGnb.setClass(nextSectionIndex-1, MainVisual.getNextVisualIndex());

      }

    });

  }


  /**
   * event
   */

  // 공통 이벤트
  (function(){

    $('.gnb-depth1-link').on('mouseenter', function(){
      $('.gnb').addClass('on');
    });

    $('.gnb').on('mouseleave', function(){
      $('.gnb').removeClass('on');
    });

    $('.header, .gnb').on({

      'mouseenter' : function(){
        $('.header').attr('class', 'header');
        $('.gnb').attr('class', 'gnb');
      },

      'mouseleave' : function(){
        if(HeaderGnb.getCurrentMainSectionIndex()==0){

          HeaderGnb.setClass(HeaderGnb.getCurrentMainSectionIndex(), MainVisual.getNextVisualIndex());

        } else {

          HeaderGnb.setClass(HeaderGnb.getCurrentMainSectionIndex());

        }
      }

    });



    // Layer Popup 닫기
    $('.layer-close').on('click', function(){

      LayerPopup.closePopup( $(this).parent('.layer') );

    });

  })();

  // 메인 페이지 이벤트
  (function(){

    $('.arrow.prev').on('click', function(){

      MainVisual.rollStop();

      if( !MainVisual.checkAnimate() ){

        MainVisual.rollRight();

      }

    });

    $('.arrow.next').on('click', function(){

      MainVisual.rollStop();

      if( !MainVisual.checkAnimate() ){

        MainVisual.rollLeft();

      }

    });

    $('.play-button').on('click', function(){

      if( $(this).hasClass('pause') ){

        MainVisual.rollStop();

      } else {

        MainVisual.rollAuto();

      }

    });

  })();

  // 출발 시간표 페이지 이벤트
  (function(){

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

  })();

  // 쇼핑/이벤트 페이지
  (function(){

    $('.boxmodel2-list-item .btn-type-small').on('click', function(){

      BoxModel.openBoxModel2Detail( $(this) );

    });

  })();


});


