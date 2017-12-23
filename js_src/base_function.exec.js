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

  // detect main page
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

  // set full page

  (function(){

    if( $('#fullpage').length > 0 ){

      //FullPage.sectionBgInit();

      $('#fullpage').fullpage({
        scrollBar: true,
        scrollingSpeed: 1000,
        afterLoad: function(anchorLink, index){
          console.log('adgdasg');
        }

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

        $('.header, .gnb').addClass('bg');

      },

      'mouseleave' : function(){

        if( !$(this).hasClass('fixed') && !$('.total-search').hasClass('show') ){

          if( $('html').hasClass('main') ){
            $('.header, .gnb').removeClass('bg');
          }
        }

      }

    });

    $('.gnb').on({

      'mouseenter' : function(){

        if( !$(this).hasClass('fixed') ){

          $('.header, .gnb').addClass('bg');

        }

      },

      'mouseleave' : function(){

        if( !$(this).hasClass('fixed') && !$('.total-search').hasClass('show') ){

          if( $('html').hasClass('main') ){
            $('.header, .gnb').removeClass('bg');
          }
        }

        $('.gnb').removeClass('on')

      }

    });

    $('.gnb-depth1-link').on('mouseenter', function(e){

      e.stopPropagation();

      if( !$('.gnb').hasClass('fixed') ){

        //$('.header, .gnb').addClass('show');
        $('.header, .gnb').addClass('bg');

      }

      $('.gnb').addClass('on');

    });

    $('.gnb-search').on('click', function(){

      $('.total-search').addClass('show');
      $('.header, .gnb').addClass('bg');

    });

    $('.total-search-close').on('click', function(){

      $('.total-search').removeClass('show');

      $(window).scroll();

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

    }).resize();

    $(window).on('scroll', function(){

      if( !$('.total-search').hasClass('show') ){

        var scrollAmount = ( $(this).scrollTop() / scrollHeight ) * 100;

        $('.scroll-amount').css({width : scrollAmount + '%'});

        if( $(this).scrollTop() >= 50 ){

          //$('.header, .gnb').addClass('fixed');


        } else if( $(this).scrollTop() < 50 ){

          //$('.header, .gnb').removeClass('fixed');
          //$('.scroll-amount').css({width : 0});

        }

        if( $(this).scrollTop() >= 400 ){

          if( $('html').hasClass('main') ){

            $('.header, .gnb').addClass('fixed bg down');

          } else {

            $('.header, .gnb').addClass('fixed down');

          }

          $('.top-popup').removeClass('top-open').addClass('down');
          $('.top-popup-toggle').data('open', false).removeClass('down');
          $('.header').removeClass('top-open');
          $('.gnb').removeClass('top-open');
          $('.total-search').removeClass('top-open');
          $('.quick').removeClass('top-open');

          $('.total-search').addClass('down');

        } else if( $(this).scrollTop() < 400 ){

          if( $('html').hasClass('main') ){

            $('.header, .gnb').removeClass('fixed bg down');

          } else {

            $('.header, .gnb').removeClass('fixed down');

          }

          $('.top-popup').removeClass('down');
          $('.total-search').removeClass('down');

        }

        try{

          if( $(this).scrollTop() >= $('.section2').offset().top ){

            $('.section2').removeClass('bg-fixed');

          } else if( $(this).scrollTop() < $('.section2').offset().top ){

            $('.section2').addClass('bg-fixed');

          }

          if( $(this).scrollTop() >= $('.section3').offset().top ){

            $('.section3').removeClass('bg-fixed');

          } else if( $(this).scrollTop() < $('.section3').offset().top ){

            $('.section3').addClass('bg-fixed');

          }

        } catch(e) {

          //console.log('SUB PAGE');

        }

      }

    }).scroll();

  })();

  // 상단 팝업 이빈트
  (function(){

    $('.top-popup-control-arrow .arrow.prev').on('click', function(){

      console.log(24);

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

      console.log( $(this).data('open') );

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

  })();

});


