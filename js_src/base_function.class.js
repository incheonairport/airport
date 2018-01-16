/**************
 * Base Class *
 **************/

var Index, HeaderGnb, TableLike, MainVisual, TopPopup, BottomBanner, BoxModel, ShoppingBanner, Zoom;

$(function(){

  /**
   * Index Class( Parent Class )
   */

  Index = function(){

    this.$mainSection = $('.full-page-content .section');
    this.$mainVisualItem = $('.main-visual-item');
    this.$mainFullPageContent = $('.full-page-content');
    this.currentMainSectionIndex = 0;
    this.easingType = 'easeInOutExpo';

    this.setCurrentMainSectionIndex = function(currentIndex){

      this.currentMainSectionIndex = currentIndex;

    };

    this.getCurrentMainSectionIndex = function(){

      return this.currentMainSectionIndex;

    };

  };

  /**
   * HeaderGnb Class
   */

  HeaderGnb = new function(){

    Index.apply(this);

    this.mobileHeaderInit = function(){

      $('.header-util-cs').insertBefore('.gnb-depth1');

      $('.header-util-lang').insertAfter('.gnb-depth1');

      $('.header-site').insertAfter('.gnb-depth1');

      $('.scroll-amount').insertBefore('.header-util');

      $('.header-search-item.gnb-search .header-search-input').addClass('mobile-none');
      $('.header-search-item.gnb-search .header-search-close').removeClass('mobile-none');

      if( $('.gnb-mobile-btn').length <= 0 ){
        $('.header').append('<button type="button" class="gnb-mobile-btn btn-gnb"><span>주메뉴 열기</span></button>');
      }

      if( $('.quick-toggle').length <= 0 ){
        $('.quick').append('<button type="button" class="quick-toggle"><span>퀵메뉴 열기</span></button>');
      }

      if( $('.gnb-mobile-btn-close').length <= 0){
        $('.gnb').append('<button type="button" class="gnb-mobile-btn-close">닫기</button>');
      }

    };

    this.pcHeaderInit = function(){

      $('.header-util-cs').appendTo( $('.header-util') );

      $('.header-util-lang').appendTo( $('.header-util') );

      $('.header-site').prependTo( $('.header') );

      $('.scroll-amount').insertAfter('.header-search');

      //$('.header-search-item.gnb-search').appendTo($('.header-search'));

      $('.gnb-mobile-btn').remove();
      $('.gnb-mobile-btn-close').remove();
      $('.quick-toggle').remove();

    };

  };

  /**
   * MainVisual Class
   */

  MainVisual = new function(){

    Index.apply(this);

    // private
    var currentVisualIndex = 0;
    var nextVisualIndex = 0;

    var $visualItem = this.$mainVisualItem;
    var easingType = this.easingType;

    var $pageItem;

    var timeID, timeID2;
    var imageMovingTime = 1000;
    var imageIntervalTime = 10000;
    var barStretchTime = 10;

    // private
    var _initPaging = function(){

      var $paging = $('<ul class="paging-visual"></ul>');

      $('.main-visual-control-paging').prepend($paging);

      for(var i=0; i<$visualItem.length; i++){
        $paging.append('<li class="paging-item"><div class="paging-link">' + (i+1) + '</div></li>');
      }

      $pageItem = $('.paging-item');
      $pageItem.removeClass('on');
      $pageItem.eq(0).find('.paging-link').addClass('on');

    };

    var _initPosition = function(){

      $visualItem.hide().eq(0).show();

    };

    var _init = function(){

      _initPosition();

      _initPaging();

    };

    var _textMotion = function(){

      $visualItem.eq(currentVisualIndex).find('.visual-text').eq(0).stop().animate({
        opacity:1,
        top:0
      }, 1000, 'easeOutCubic');

      $visualItem.eq(currentVisualIndex).find('.visual-text').eq(1).stop().delay(300).animate({
        opacity:1,
        top:0
      }, 1000, 'easeOutCubic');

      $visualItem.eq(currentVisualIndex).find('.visual-text').eq(2).stop().delay(600).animate({
        opacity:1,
        top:0
      }, 1000, 'easeOutCubic');

      $visualItem.eq(currentVisualIndex-1).find('.visual-text').eq(0).stop().animate({
        opacity:0,
        top:-20
      }, 1000, 'easeOutCubic');

      $visualItem.eq(currentVisualIndex-1).find('.visual-text').eq(1).stop().delay(500).animate({
        opacity:0,
        top:-20
      }, 1000, 'easeOutCubic');

      $visualItem.eq(currentVisualIndex-1).find('.visual-text').eq(2).stop().delay(500).animate({
        opacity:0,
        top:-20
      }, 1000, 'easeOutCubic');

      $visualItem.eq(currentVisualIndex+1).find('.visual-text').eq(0).stop().animate({
        opacity:0,
        top:-20
      }, 1000, 'easeOutCubic');

      $visualItem.eq(currentVisualIndex+1).find('.visual-text').eq(1).stop().delay(500).animate({
        opacity:0,
        top:-20
      }, 1000, 'easeOutCubic');

      $visualItem.eq(currentVisualIndex+1).find('.visual-text').eq(2).stop().delay(500).animate({
        opacity:0,
        top:-20
      }, 1000, 'easeOutCubic');

    };

    var _timeBar = function(auto){

      clearInterval(timeID2);

      var barStretch = 0;
      var unitLength = 100 / ( imageIntervalTime / barStretchTime );

      $('.paging-link.on').css({height:(100 - barStretch) + '%'});

      if(auto){

        timeID2 = setInterval(function(){
          $('.paging-link.on').css({height:(100 - barStretch) + '%'});
          barStretch += unitLength;
        }, barStretchTime);

      }

    };

    var _setPlayButtonClass = function(status){
      $('.main-visual-control-paging .play-button').attr('class', 'play-button').addClass(status);
    };

    // public
    this.fade = function(){

      if( nextVisualIndex >= $visualItem.length ){

        nextVisualIndex = 0;

      } else if( nextVisualIndex <= -1 ){

        nextVisualIndex = $visualItem.length-1;

      }

      $visualItem.eq(currentVisualIndex).stop().fadeOut(imageMovingTime, easingType);
      $visualItem.eq(nextVisualIndex).stop().fadeIn(imageMovingTime, easingType, function(){
        _textMotion();
      });

      $pageItem.find('.paging-link').removeClass('on');
      $pageItem.eq(nextVisualIndex).find('.paging-link').addClass('on');

      currentVisualIndex = nextVisualIndex;

    };

    this.rollFirst = function(){
      _timeBar(true);

      setTimeout(function(){
        _textMotion();
      }, 1000);
    };

    this.rollAuto = function(){

      var _fade = this.fade;

      timeID = setInterval(function(){

        nextVisualIndex = currentVisualIndex + 1;
        _fade();

        _timeBar(true);

      }, imageIntervalTime);

      _setPlayButtonClass('pause');

    };

    this.rollLeft = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex + 1;
      this.fade();
      _timeBar(false);

    };

    this.rollRight = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex - 1;
      this.fade();
      _timeBar(false);

    };

    this.rollStop = function(){

      // stop rolling
      clearInterval(timeID);

      // stop time bar
      clearInterval(timeID2);

      _setPlayButtonClass('play');

    };

    this.checkAnimate = function(){

      return this.$mainVisualItem.is(':animated');

    };

    this.getNextVisualIndex = function(){

      return nextVisualIndex;

    };

    // running in constructor when loading
    _init();
    //this.rollFirst();
    //this.rollAuto();

  };

  /**
   * TopPopup Class
   */

  TopPopup = new function(){

    Index.apply(this);

    // private
    var $visualItem = $('.top-popup-item');
    var easingType = this.easingType;

    var currentVisualIndex = 0;
    var nextVisualIndex = 0;
    var totalPage = $visualItem.length;

    var timeID;
    var imageMovingTime = 1000;
    var imageIntervalTime = 10000;

    // private
    var _initPaging = function(){

      $('.top-popup-control-paging-number').find('.current').text(currentVisualIndex+1);
      $('.top-popup-control-paging-number').find('.total').text(totalPage);

    };

    var _initPosition = function(){

      $visualItem.hide().eq(0).show();

    };

    this.init = function(){

      _initPosition();

      _initPaging();

    };

    // public
    this.fade = function(){

      if( nextVisualIndex >= $visualItem.length ){

        nextVisualIndex = 0;

      } else if( nextVisualIndex <= -1 ){

        nextVisualIndex = $visualItem.length-1;

      }

      $visualItem.eq(currentVisualIndex).stop().fadeOut(imageMovingTime, easingType);
      $visualItem.eq(nextVisualIndex).stop().fadeIn(imageMovingTime, easingType);

      $('.top-popup-control-paging-number').find('.current').text(nextVisualIndex+1);

      currentVisualIndex = nextVisualIndex;

    };

    this.rollAuto = function(){

      var _fade = this.fade;

      timeID = setInterval(function(){

        nextVisualIndex = currentVisualIndex + 1;
        _fade();

      }, imageIntervalTime);

    };

    this.rollLeft = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex + 1;
      this.fade();

    };

    this.rollRight = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex - 1;
      this.fade();

    };

    this.rollStop = function(){

      // stop rolling
      clearInterval(timeID);

    };

    this.checkAnimate = function(){

      return $visualItem.is(':animated');

    };

    // running in constructor when loading
    this.init();
    this.rollAuto();

  };

  /**
   * BottomBanner Class
   */

  BottomBanner = new function(){

    // private
    var currentVisualIndex = 0;
    var nextVisualIndex = 0;

    var easingType = this.easingType;

    var timeID;
    var imageMovingTime = 1000;
    var imageIntervalTime = 3000;

    var $bannerList = $('.main-banner-list');
    var $bannerItem = $('.main-banner-item');

    var itemWidth = 0;
    var listWidth = 0;

    this.init = function(){

      if( $(window).width() > 1024 ){

        $bannerItem.each(function(){

          itemWidth = $(this).width() + parseInt( $(this).css('margin-right') );

          listWidth += itemWidth;

        });

      } else {

        $bannerItem.each(function(){

          itemWidth = $(this).width();

          listWidth += itemWidth;

        });

      }

      $bannerList.width(listWidth);

    };

    this.moveLeft = function(){

      $bannerList.stop().animate({
        left : -itemWidth
      }, imageMovingTime, easingType, function(){
        $('.main-banner-item:last-child').after($('.main-banner-item:first-child'));
        $bannerList.css({left:0});
      });

      currentVisualIndex = nextVisualIndex;

    };

    this.moveRight = function(){

      $('.main-banner-item:first-child').before($('.main-banner-item:last-child'));
      $bannerList.css({left:-itemWidth});

      $bannerList.stop().animate({
        left : 0
      }, imageMovingTime, easingType, function(){
        //$bannerList.css({left:-itemWidth});
      });

      currentVisualIndex = nextVisualIndex;

    };

    this.rollAuto = function(){

      var _moveLeft = this.moveLeft;

      timeID = setInterval(function(){

        nextVisualIndex = currentVisualIndex + 1;
        _moveLeft();

      }, imageIntervalTime);

    };

    this.rollLeft = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex + 1;
      this.moveLeft();

    };

    this.rollRight = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex - 1;
      this.moveRight();

    };

    this.rollStop = function(){

      // stop rolling
      clearInterval(timeID);

    };

    this.checkAnimate = function(){

      return $bannerList.is(':animated');

    };

    this.init();
    this.rollAuto();


  };

  /**
   * BoxModel Class
   */

  BoxModel = new function(){

    var $listItem = $('.boxmodel2-list-item');

    this.openBoxModel2Detail = function( $this ){

      $this.parents($listItem).toggleClass('on');
      if($this.parents($listItem).hasClass('on')) {
        $this.text('닫기');
      } else {
        $this.text('펼치기');
      }

    }

  };

  /**
   * TableLike Class
   */

  TableLike = new function(){

    // private member
    var $table = $('.table-like');
    var tableNum = $table.length;
    var $flightInfoDetail = $('.flight-info-detail').data('open', false);

    // public member


    // private method


    // public method
    this.setColumnWidth = function(){

      $table = $('.table-like');
      tableNum = $table.length;
      $flightInfoDetail = $('.flight-info-detail').data('open', false);

      for(var i=0; i<tableNum; i++){

        var thWidth = [];

        $table.eq(i).find('.th-like').each(function(){

          thWidth.push($(this).outerWidth());

        });

        $table.eq(i).find('.tr-like').each(function(){

          var colSkip = 0;

          if( $(this).children().hasClass('th-like') ){
            return true;
          }

          $(this).find('.td-like').each(function(){

            var colspanPos;
            var colspanNumber = 1;
            var colspanWidth = 0;

            if( ( colspanPos = $(this).attr('class').indexOf('colspan') ) >= 0 ){
              colspanNumber = $(this).attr('class').substr(colspanPos, 9).split('-')[1];
            }

            for(var i=0; i<colspanNumber; i++){

              colspanWidth += thWidth[colSkip];
              colSkip++;

            }

            $(this).outerWidth(colspanWidth);

          });

        });

      }

    };

    this.openInfoDetail = function( $thisFlightInfoDetail ){

      $flightInfoDetail.removeClass('on').data('open', false);

      $thisFlightInfoDetail.addClass('on').data('open', true);

    };

    this.closeInfoDetail = function( $thisFlightInfoDetail ){

      $thisFlightInfoDetail.removeClass('on').data('open', false);

    };

    this.openInfoDetailShare = function( $thisFlightInfoDetailShare ){

      $thisFlightInfoDetailShare.addClass('on');

    };

    this.closeInfoDetailShare = function( $thisFlightInfoDetailShare ){

      $thisFlightInfoDetailShare.removeClass('on');

    };


    // constructor
    this.setColumnWidth();

  };

  /**
   * ShoppingBanner Class
   */

  ShoppingBanner = new function(){

    // private
    var currentVisualIndex = 0;
    var nextVisualIndex = 0;

    var $visualItem = $('.slide-banner-list-item');
    var easingType = this.easingType;

    var timeID, timeID2;
    var imageMovingTime = 1000;

    // private
    var _initPosition = function(){

      $visualItem.hide().eq(0).show();

    };

    var _init = function(){

      _initPosition();

    };

    var _setPlayButtonClass = function(status){
      $('.main-visual-control-paging .play-button').attr('class', 'play-button').addClass(status);
    };

    // public
    this.fade = function(){

      if( nextVisualIndex >= $visualItem.length ){

        nextVisualIndex = 0;

      } else if( nextVisualIndex <= -1 ){

        nextVisualIndex = $visualItem.length-1;

      }

      $visualItem.eq(currentVisualIndex).stop().fadeOut(imageMovingTime, easingType);
      $visualItem.eq(nextVisualIndex).stop().fadeIn(imageMovingTime, easingType);

      //$pageItem.find('.paging-link').removeClass('on');
      //$pageItem.eq(nextVisualIndex).find('.paging-link').addClass('on');

      currentVisualIndex = nextVisualIndex;

    };

    this.rollLeft = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex + 1;
      this.fade();

    };

    this.rollRight = function(){

      this.rollStop();

      nextVisualIndex = currentVisualIndex - 1;
      this.fade();

    };

    this.rollStop = function(){

      // stop rolling
      clearInterval(timeID);

      // stop time bar
      clearInterval(timeID2);

      _setPlayButtonClass('play');

    };

    this.checkAnimate = function(){

      return this.$mainVisualItem.is(':animated');

    };

    this.getNextVisualIndex = function(){

      return nextVisualIndex;

    };

    // running in constructor when loading
    _init();

  };

  /**
   * Zoom Class
   */

  Zoom = new function(){

    var size = 1.0;

    this.exec = function (v) {

      var currentSize = size;
      if (v == 0) {
        currentSize = 1.0;
      } else {
        currentSize += v * 0.1;
      }

      if (currentSize < 0.8 || currentSize > 3.0) {
        //alert(currentSize);
        return;
      } else {
        size = currentSize;
      }

      if ( !$('html').hasClass('ie') ) {
        $('body').css('-webkit-transform','scale(' + size + ')');
        $('body').css('-moz-transform','scale(' + size + ')');
        $('body').css('-o-transform','scale(' + size + ')');

        $('body').css('-webkit-transform-origin', '50% 0%');
        $('body').css('-moz-transform-origin', '50% 0%');
        $('body').css('-o-transform-origin', '50% 0%');
      } else {
        $('body').css('zoom', (size * 100) + '%');
        $('body').css('-ms-transform','scale(' + size + ')');
        $('body').css('-ms-transform-origin', '50% 0%');

        $('body')[0].filters.item(0).M11 *= 1.5;
        $('body')[0].filters.item(0).M12 *= 1.5;
        $('body')[0].filters.item(0).M21 *= 1.5;
        $('body')[0].filters.item(0).M22 *= 1.5;

        $('body').css('transform','scale(' + size + ')');
        $('body').css('transform-origin', '50% 0%');
      }

      if( size == 1 ){

       $('body').attr('style', '');

      }



    };

    //this.exec(1);

  };

});



