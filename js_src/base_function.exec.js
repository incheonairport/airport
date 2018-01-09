/******************
 * Base Execution *
 ******************/

  // loading
(function(){

  setTimeout(function(){
    $('.loading-inner').removeClass('opacity');
  }, 1000);

  $(window).on('load', function(){
    setTimeout(function(){
      $('.loading').addClass('opacity').delay(1000).queue(function(){
        $(this).addClass('none');
      });
    }, 3000);
  })

})();

$(function(){

  /**
   * loading
   */

  var scrollHeight;

  $('.gnb').append('<div class="scroll-amount"></div>');

  (function(){

    var $html = $('html');
    var lang = $html.attr('lang');


    switch(lang){

      case 'ko' :
        $html.addClass('ko');
        break;

      case 'en' :
        $html.addClass('en');
        break;

      case 'ch' :
        $html.addClass('ch');
        break;

      case 'ja' :
        $html.addClass('ja');
        break;

    }

  })();

  (function(){

    $(window).on('resize', function(){

      BottomBanner.init();

      if( $(window).width() > 1024 ){

        HeaderGnb.pcHeaderInit();
        $('.gnb').removeClass('mobile-on');
        //$('.visual-text').addClass('text-right text-left');

        if( $(window).scrollTop() < 400 ){
          if( $('section').hasClass('main-visual') ){

            $('html').addClass('main');

            $('.top-popup').addClass('top-open');
            $('.header').addClass('top-open');
            $('.gnb').addClass('top-open');
            $('.total-search').addClass('top-open');
            $('.quick').addClass('top-open');
            $('.top-popup-toggle').data('open', true).addClass('down');

          } else {

            $('.top-popup').data('open', false);

          }
        }

      } else {

        HeaderGnb.mobileHeaderInit();
        $('.visual-text').removeClass('text-right text-left');

        $('.top-popup').removeClass('top-open');
        $('.header').removeClass('top-open');
        $('.gnb').removeClass('top-open');
        $('.total-search').removeClass('top-open');
        $('.quick').removeClass('top-open');
        $('.top-popup-toggle').data('open', true).removeClass('down');

      }

    }).resize();



    //if( $('section').hasClass('top-popup') ){
    //
    //  $('.top-popup').addClass('top-open');
    //  $('.header').addClass('top-open');
    //  $('.gnb').addClass('top-open');
    //  $('.total-search').addClass('top-open');
    //  $('.quick').addClass('top-open');
    //  $('.top-popup-toggle').data('open', true).addClass('down');
    //
    //}

  })();


  // set full page

  (function(){

    if( $('#fullpage').length > 0 ){

      //FullPage.sectionBgInit();

      $('#fullpage').fullpage({
        scrollBar: true,
        scrollingSpeed: 1000,
        responsiveWidth: 1024
        //afterLoad: function(anchorLink, index){
        //  if(index == 2){
        //    MainVisual.rollStop();
        //    MainVisual.rollFirst();
        //    MainVisual.rollAuto();
        //  }
        //}

      });

    }

  })();

  /**
   * event
   */

  //Header 이벤트
  (function(){

    $('.header').on({

      'mouseenter' : function(){

        if( $(window).width() > 1024 ){
          $('.header, .gnb').addClass('bg');
        }

      },

      'mouseleave' : function(){

        if( $(window).width() > 1024 ){
          if( !$(this).hasClass('fixed') && !$('.total-search').hasClass('show') ){

            if( $('html').hasClass('main') ){
              $('.header, .gnb').removeClass('bg');
            }
          }
        }

      }

    });

    $('.gnb').on({

      'mouseenter' : function(){

        if( $(window).width() > 1024 ){
          if( !$(this).hasClass('fixed') ){

            $('.header, .gnb').addClass('bg');

          }
        }

      },

      'mouseleave' : function(){

        if( $(window).width() > 1024 ){
          if( !$(this).hasClass('fixed') && !$('.total-search').hasClass('show') ){

            if( $('html').hasClass('main') ){
              if( !$('.header-search-item.gnb-search').hasClass('on') ){
                $('.header, .gnb').removeClass('bg');
              }
            }
          }

          $('.gnb').removeClass('on')
        }

      }

    });

    $('.gnb-depth1-link').on('mouseenter', function(e){

      if( $(window).width() > 1024 ){
        e.stopPropagation();

        if( !$('.gnb').hasClass('fixed') ){

          //$('.header, .gnb').addClass('show');
          $('.header, .gnb').addClass('bg');

        }

        $('.gnb').addClass('on');
      }

    });

    $('.gnb-depth1-link').on('click', function(e){

      if( $(window).width() <= 1024 ){

        e.preventDefault();

      }

    });

    $('.header-search-btn.gnb-search').on('mouseenter', function(){

      $('.header-search-item.gnb-search').addClass('on');

    });

    $('body').on('click', function(e){

      if( !$(e.target).hasClass('header-search-btn') ){

        if( !$(e.target).hasClass('header-search-input') ){

          $('.header-search-item.gnb-search').removeClass('on');

        }

      }

      if( $(window).scrollTop() < 400 && $('html').hasClass('main') ){
        if( $(window).width() > 1024 ){
          if( !$('.header-search-item.gnb-search').hasClass('on') ){
            $('.header, .gnb').removeClass('bg');
          }
        }
      }

    });

    $('body').on('click', 'button.gnb-mobile-btn', function(e){

      $('.gnb').addClass('mobile-on');

    });

    $('body').on('click', 'button.gnb-mobile-btn-close', function(e){

      $('.gnb').removeClass('mobile-on');

    });

  })();

  // 공통 이벤트
  (function(){

    // Layer Popup 닫기
    $('.layer-close').on('click', function(){

      LayerPopup.closePopup( $(this).parent('.layer') );

    });

    $(window).on('resize', function(){

      scrollHeight = $('body').height() - $(window).height();

      if( $('html').hasClass('main') ){
        if( $(window).width() > 1024 ){

          if( $(window).scrollTop() < 400 ){

            $('.header, .gnb').removeClass('fixed down bg');

          }

        } else {

          $('.header, .gnb').removeClass('fixed down').addClass('bg');

        }
      }

    }).resize();

    var prevScroll = 0;

    $(window).on('scroll', function(e){

      var scrollAmount = ( $(this).scrollTop() / scrollHeight ) * 100;
      $('.scroll-amount').css({width : scrollAmount + '%'});
      var currentScroll = $(this).scrollTop();

      if( $(window).width() > 1024 ){

        if( $('section').hasClass('main-visual') ){
          if( $(this).scrollTop() >= 400 ){

            $('.header, .gnb').addClass('fixed bg down');

            $('.top-popup').removeClass('top-open').addClass('down');
            $('.top-popup-toggle').data('open', false).removeClass('down');
            $('.header').removeClass('top-open');
            $('.gnb').removeClass('top-open');
            $('.total-search').removeClass('top-open');
            $('.quick').removeClass('top-open');

            $('.total-search').addClass('down');

          } else if( $(this).scrollTop() < 400 ){

            if( $('.header-search-item').hasClass('on') ){

              if( currentScroll < prevScroll ){
                // up
                $('.header, .gnb').removeClass('fixed down');
              }

            } else {
              $('.header, .gnb').removeClass('fixed bg down');
            }

            $('.top-popup').removeClass('down');
            $('.total-search').removeClass('down');

          }

        } else {

          if( $(this).scrollTop() >= 400 ){

            $('.header, .gnb').addClass('fixed down');

            $('.top-popup').removeClass('top-open').addClass('down');
            $('.top-popup-toggle').data('open', false).removeClass('down');
            $('.header').removeClass('top-open');
            $('.gnb').removeClass('top-open');
            $('.total-search').removeClass('top-open');
            $('.quick').removeClass('top-open');

            $('.total-search').addClass('down');

          } else if( $(this).scrollTop() < 400 ){

            $('.header, .gnb').removeClass('fixed down');

            $('.top-popup').removeClass('down');
            $('.total-search').removeClass('down');

          }

        }

      }

      prevScroll = currentScroll;

    }).scroll();

  })();

  // 상단 팝업 이빈트
  (function(){

    $('.top-popup-control-arrow .arrow.prev').on('click', function(){

      if( !TopPopup.checkAnimate() ){

        TopPopup.rollRight();

      }

    });

    $('.top-popup-control-arrow .arrow.next').on('click', function(){

      console.log(24);

      if( !TopPopup.checkAnimate() ){

        TopPopup.rollLeft();

      }

    });

    $('.top-popup-control-paging .play-button.play').on('click', function(){

      TopPopup.rollAuto();

    });

    $('.top-popup-control-paging .play-button.pause').on('click', function(){

      TopPopup.rollStop();

    });

    $('.top-popup-toggle').on('click', function(){

      if( $(this).data('open') ){
        $('.top-popup').removeClass('top-open');
        $('.top-popup-toggle').data('open', false).removeClass('down');
        $('.header').removeClass('top-open');
        $('.gnb').removeClass('top-open');
        $('.total-search').removeClass('top-open');
        $('.quick').removeClass('top-open');
      } else {
        $('.top-popup').addClass('top-open');
        $('.top-popup-toggle').data('open', true).addClass('down');
        $('.header').addClass('top-open');
        $('.gnb').addClass('top-open');
        $('.total-search').addClass('top-open');
        $('.quick').addClass('top-open');
      }

    });

  })();

  // 메인 페이지 이벤트
  (function(){

    $('.main-visual-control-arrow .arrow.prev').on('click', function(){

      if( !MainVisual.checkAnimate() ){

        MainVisual.rollRight();

      }

    });

    $('.main-visual-control-arrow .arrow.next').on('click', function(){

      if( !MainVisual.checkAnimate() ){

        MainVisual.rollLeft();

      }

    });

    $('.main-visual-control-paging .play-button').on('click', function(){

      if( $(this).hasClass('pause') ){

        MainVisual.rollStop();

      } else {

        MainVisual.rollAuto();

      }

    });

  })();

  // 하단 배너 이벤트
  (function(){

    $('.main-banner-control-arrow .arrow.prev').on('click', function(){

      if( !BottomBanner.checkAnimate() ){

        BottomBanner.rollRight();

      }

    });

    $('.main-banner-control-arrow .arrow.next').on('click', function(){

      if( !BottomBanner.checkAnimate() ){

        BottomBanner.rollLeft();

      }

    });

    $('.main-banner-control-paging .play-button.play').on('click', function(){

      BottomBanner.rollAuto();

    });

    $('.main-banner-control-paging .play-button.pause').on('click', function(){

      BottomBanner.rollStop();

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

    $('.slide-banner-btn.slide-left').on('click', function(){
      ShoppingBanner.rollRight();
    });

    $('.slide-banner-btn.slide-right').on('click', function(){
      ShoppingBanner.rollLeft();
    });

  })();

  // map scroll overflow div add
  (function(){

    $('.imgbox').wrap('<div class="imgbox-extend" />');

  })();

});


