/*******************
 * Layer Execution *
 *******************/

$(function(){

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

});