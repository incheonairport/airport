/*******************
 * Layer Execution *
 *******************/

$(function(){

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

  // window close
  (function(){

    $('.lp-close').on('click', function(e){

      e.preventDefault();

      if( $(this).parents('html').attr('class').indexOf('ie') != -1 ){
        window.open('','_self').close()
      } else {
        window.close();
        self.close();
        window.opener = window.location.href;
        self.close();
        window.open('about:blank','_self').close();
      }

    });

  })();

  // header lnb index check
  (function(){

    var gnbLinkIndex = $('.gnb-link').index( $('.gnb-link.on') );

    $('.header').addClass('sub' + (gnbLinkIndex+1) );

  })();

  // header action when mobile
  (function(){

    $('.layer-gnb-mobile-btn').on('click',function(){
      MobileGnb.mobileOnOffMenu('on');
    });

    $('.layer-gnb-mobile-btn-close').on('click',function(){
      MobileGnb.mobileOnOffMenu('off');
    });

    $(window).on('resize', function(){
      var widthSize = window.outerWidth;
      if (widthSize <= 780) {
        $('.header').animate({left: -100 + '%'},0);
        $('.mobile-header').removeClass('active');
      } else if (widthSize > 780) {
        $('.header').animate({left:0},0);
      }
    }).resize();

  })();

  // time table show/hide
  (function(){

    $('.maglev-train-line-list-article-link').on('click', function(){

      var $tableNode = $('.maglev-train-line-time-table');

      ShowHide.hideAllContent( $tableNode );

      var indexNum = $(this).index('.maglev-train-line-list-article-link');

      ShowHide.showHideContent(true, indexNum, $tableNode);

    });

  })();

  // map scroll overflow div add
  //(function(){
  //
  //  $('.imgbox').wrap('<div class="imgbox-extend" />');
  //
  //})();



  // 공항지도 이벤트
  (function(){

    $('.search-map-box-level2').on('click', function (e) {
      e.preventDefault();
      $(this).addClass('on').parent().siblings().children().removeClass('on');
    });

    $('.search-map-box-level3').on('click', function (e) {
      e.preventDefault();
      $(this).addClass('on').parent().siblings().children().removeClass('on');
    });

    $('.search-map-control').data('open', true).on('click', function (e) {
      e.preventDefault();

      if( $(this).data().open ){
        $('.search-map-clear').addClass('on');
        $(this).data('open', false);
      } else {
        $('.search-map-clear').removeClass('on');
        $(this).data('open', true);
      }
    });



    $('.map-full-screen').data('full', false).on('click', function(){

      if( !$(this).data().full ){

        $(this).addClass('full-screen').attr('title', '전체화면 종료');

        $('.header.airport-services').addClass('full-screen');

        $('.contents').addClass('full-screen');

        $('.inner-contents').addClass('full-screen');

        $('.search-map-contents').addClass('full-screen');

        $('.search-map-clear').addClass('full-screen on');
        $('.search-map-control').data('open', false);
        $('.header').addClass('full-screen');

        $(this).data('full', true);

      } else {

        $(this).removeClass('full-screen').attr('title', '전체화면');

        $('.header.airport-services').removeClass('full-screen');

        $('.contents').removeClass('full-screen');

        $('.inner-contents').removeClass('full-screen');

        $('.search-map-contents').removeClass('full-screen');

        $('.search-map-clear').removeClass('full-screen on');
        $('.search-map-control').data('open', true);
        $('.header').removeClass('full-screen');

        $(this).data('full', false);

      }



    });

  })();

  // map touchmove
  //(function(){
  //  var tracks = [];
  //  $('#mapArea svg').on("touchmove", function (event) {
  //    if (event.originalEvent.touches.length === 2) {
  //      tracks.push([ [event.originalEvent.touches[0].pageX, event.originalEvent.touches[0].pageY], [event.originalEvent.touches[1].pageX, event.originalEvent.touches[1].pageY] ]);
  //    }
  //  }).on("touchstart", function () {
  //    tracks = [];
  //  }).on("touchend", function () {
  //
  //  });
  //})();

});