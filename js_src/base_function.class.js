/**
 * HeaderGnb Class
 */

/**
 * MainVisual Class
 */

var MainVisual = function(){

  // private
  var currentIndex = 0;
  var nextIndex = 0;
  var $visualItem = $('.main-visual-item');
  var $mainSection = $('.full-page-content .section');
  var $pageItem;
  var timeID, timeID2;
  var imageMovingTime = 3000;
  var imageIntervalTime = 10000;
  var barStretchTime = 10;
  var easingType = 'easeInOutExpo';
  var useVisualClass = true;
  var useSectionClass = true;
  var mainSectionIndex = 0;

  // private
  var _initPaging = function(){

    var $paging = $('<ul class="paging-visual"></ul>');

    $('.main-visual-control-paging').prepend($paging);

    for(var i=0; i<$visualItem.length; i++){
      $paging.append('<li class="paging-item"><div href="#" class="paging-link">' + (i+1) + '</div></li>');
    }

    $pageItem = $('.paging-item');
    $pageItem.removeClass('on');
    $pageItem.eq(0).find('.paging-link').addClass('on');

  };

  var _initClass = function(){

    $('.header, .gnb').addClass( $('.full-page-content').find('.section').eq(0).data('gnb-color') );

  };

  var _init = function(){

    $visualItem.css({left:'100%'}).eq(0).css({left:0});
    $visualItem.eq( $visualItem.length-1 ).css({left:'-100%'});

    _initClass();

    _initPaging();

  };

  var _textMotion = function(){

    $visualItem.eq(currentIndex).find('.visual-text').eq(0).stop().animate({
      opacity:1,
      top:0
    }, 1000, 'easeOutCubic');

    $visualItem.eq(currentIndex).find('.visual-text').eq(1).stop().delay(300).animate({
      opacity:1,
      top:0
    }, 1000, 'easeOutCubic');

    $visualItem.eq(currentIndex).find('.visual-text').eq(2).stop().delay(600).animate({
      opacity:1,
      top:0
    }, 1000, 'easeOutCubic');

    $visualItem.eq(currentIndex-1).find('.visual-text').eq(0).stop().animate({
      opacity:0,
      top:-20
    }, 1000, 'easeOutCubic');

    $visualItem.eq(currentIndex-1).find('.visual-text').eq(1).stop().delay(500).animate({
      opacity:0,
      top:-20
    }, 1000, 'easeOutCubic');

    $visualItem.eq(currentIndex-1).find('.visual-text').eq(2).stop().delay(500).animate({
      opacity:0,
      top:-20
    }, 1000, 'easeOutCubic');

  };

  var _autoRolling = function(){

    timeID = setInterval(function(){
      nextIndex = currentIndex + 1;
      moveLeft(true);

      if( useVisualClass ){
        setClassVisual(nextIndex);
      }
    }, imageIntervalTime);

    setPlayButtonClass('pause');
  };

  var _stopRolling = function(){

    clearInterval(timeID);

    setPlayButtonClass('play');

  };

  // public


  // running in constructor when loading
  _init();

};

/**
 * BoxModel Class
 */

/**
 * Filter Class
 */

/**
 * TableLike Class
 */

