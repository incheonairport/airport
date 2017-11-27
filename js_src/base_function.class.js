/**************
 * Base Class *
 **************/

var Index, HeaderGnb, FullPage, TableLike, MainVisual, BoxModel;

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

    var $visualItem = this.$mainVisualItem;
    var $mainSection = this.$mainSection;
    var $fullPageContent = this.$mainFullPageContent;


    var _initClass = function(){
      $('.header, .gnb').addClass( $fullPageContent.find('.section').eq(0).data('gnb-color') );
    };

    var _setClassVisual = function(index){
      //console.log('set visual index : ' + index);
      $('.header').attr('class', 'header ' + $visualItem.eq(index).data('gnb-color') );
      $('.gnb').attr('class', 'gnb ' + $visualItem.eq(index).data('gnb-color') );
    };

    var _setClassSection = function(index){
      $('.header').attr('class', 'header ' + $mainSection.eq(index).data('gnb-color') );
      $('.gnb').attr('class', 'gnb ' + $mainSection.eq(index).data('gnb-color') );
      //console.log('set section index : ' + index);
    };

    this.setClass = function(setClassSectionIndex, setClassVisualIndex){

      //console.log('section index : ' + setClassSectionIndex);
      //console.log('visual index : ' + setClassVisualIndex);

      this.setCurrentMainSectionIndex(setClassSectionIndex);

      if( setClassSectionIndex == 0 ){

        //console.log('set visual');
        _setClassVisual(setClassVisualIndex);

      } else {

        //console.log('set section');
        _setClassSection(setClassSectionIndex);

      }

    };

    _initClass();

  };

  /**
   * FullPage Class
   */

  FullPage = new function(){

    Index.apply(this);

    this.sectionBgInit = function(){

      $('.full-page-content .section-main-bg').css({
        top:-480
      });

    };

    this.sectionBgDown = function(sectionNextIndex){

      this.$mainSection.eq(sectionNextIndex).find('.section-main-bg').animate({
        top:0
      }, 1000, 'easeOutQuad');

    };

    this.sectionBgUp = function(sectionPrevIndex){

      this.$mainSection.eq(sectionPrevIndex).find('.section-main-bg').delay(100).animate({
        top:-480
      }, 900, 'easeOutQuad');

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

    //var $mainSection = $('.full-page-content .section');
    //var mainSectionIndex = 0;

    var $pageItem;

    var timeID, timeID2;
    var imageMovingTime = 3000;
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

      $visualItem.css({left:'100%'}).eq(0).css({left:0});
      $visualItem.eq( $visualItem.length-1 ).css({left:'-100%'});

    };

    var _init = function(){

      _initPosition();

      _initPaging();


      setTimeout(function(){
        _textMotion();
      }, 1000);

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

    };

    var _timeBar = function(){

      var barStretch = 0;
      var unitLength = 100 / ( (imageIntervalTime-imageMovingTime) / barStretchTime );

      timeID2 = setInterval(function(){
        $('.main-visual-control-bar').css({width:barStretch + '%'});
        barStretch += unitLength;
      }, barStretchTime);

    };

    var _setPlayButtonClass = function(status){
      $('.play-button').attr('class', 'play-button').addClass(status);
    };

    this.moveLeft = function(auto){

      if( nextVisualIndex >= $visualItem.length ){
        nextVisualIndex = 0;
      }

      $visualItem.eq(currentVisualIndex).stop().animate({left:'-100%'}, imageMovingTime, easingType);
      $visualItem.eq(nextVisualIndex).css({left:'100%'}).stop().animate({left:0}, imageMovingTime, easingType, function(){
        clearInterval(timeID2);
        if(auto){
          _timeBar();
        }
        _textMotion();
      });

      $pageItem.find('.paging-link').removeClass('on');
      $pageItem.eq(nextVisualIndex).find('.paging-link').addClass('on');

      currentVisualIndex = nextVisualIndex;

    };

    this.moveRight = function(auto){

      if( nextVisualIndex <= -1 ){
        nextVisualIndex = $visualItem.length-1;
      }

      $visualItem.eq(currentVisualIndex).stop().animate({left:'100%'}, imageMovingTime, easingType);
      $visualItem.eq(nextVisualIndex).css({left:'-100%'}).stop().animate({left:0}, imageMovingTime, easingType, function(){
        clearInterval(timeID2);
        if(auto){
          _timeBar();
        }
        _textMotion();
      });

      $pageItem.find('.paging-link').removeClass('on');
      $pageItem.eq(nextVisualIndex).find('.paging-link').addClass('on');

      currentVisualIndex = nextVisualIndex;

    };

    this.rollAuto = function(){

      var _moveLeft = this.moveLeft;

      timeID = setInterval(function(){

        nextVisualIndex = currentVisualIndex + 1;
        _moveLeft(true);

        HeaderGnb.setClass(HeaderGnb.getCurrentMainSectionIndex(), nextVisualIndex);

      }, imageIntervalTime);

      _timeBar();
      _setPlayButtonClass('pause');
    };

    this.rollLeft = function(){

      nextVisualIndex = currentVisualIndex + 1;
      this.moveLeft(false);
      //console.log('rollleft : ' + nextVisualIndex);

      HeaderGnb.setClass(HeaderGnb.getCurrentMainSectionIndex(), nextVisualIndex);


    };

    this.rollRight = function(){

      nextVisualIndex = currentVisualIndex - 1;
      this.moveRight(false);
      //console.log('rollright : ' + nextVisualIndex);

      HeaderGnb.setClass(HeaderGnb.getCurrentMainSectionIndex(), nextVisualIndex);

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

    // public


    // running in constructor when loading
    _init();
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

});


