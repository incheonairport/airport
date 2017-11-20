var TableLike;

$(function(){

  /**
   * HeaderGnb Class
   */

  /**
   * MainVisual Class
   */

//var MainVisual = function(){
//
//  // private
//  var currentIndex = 0;
//  var nextIndex = 0;
//  var $visualItem = $('.main-visual-item');
//  var $mainSection = $('.full-page-content .section');
//  var $pageItem;
//  var timeID, timeID2;
//  var imageMovingTime = 3000;
//  var imageIntervalTime = 10000;
//  var barStretchTime = 10;
//  var easingType = 'easeInOutExpo';
//  var useVisualClass = true;
//  var useSectionClass = true;
//  var mainSectionIndex = 0;
//
//  // private
//  var _initPaging = function(){
//
//    var $paging = $('<ul class="paging-visual"></ul>');
//
//    $('.main-visual-control-paging').prepend($paging);
//
//    for(var i=0; i<$visualItem.length; i++){
//      $paging.append('<li class="paging-item"><div href="#" class="paging-link">' + (i+1) + '</div></li>');
//    }
//
//    $pageItem = $('.paging-item');
//    $pageItem.removeClass('on');
//    $pageItem.eq(0).find('.paging-link').addClass('on');
//
//  };
//
//  var _initClass = function(){
//
//    $('.header, .gnb').addClass( $('.full-page-content').find('.section').eq(0).data('gnb-color') );
//
//  };
//
//  var _init = function(){
//
//    $visualItem.css({left:'100%'}).eq(0).css({left:0});
//    $visualItem.eq( $visualItem.length-1 ).css({left:'-100%'});
//
//    _initClass();
//
//    _initPaging();
//
//  };
//
//  var _textMotion = function(){
//
//    $visualItem.eq(currentIndex).find('.visual-text').eq(0).stop().animate({
//      opacity:1,
//      top:0
//    }, 1000, 'easeOutCubic');
//
//    $visualItem.eq(currentIndex).find('.visual-text').eq(1).stop().delay(300).animate({
//      opacity:1,
//      top:0
//    }, 1000, 'easeOutCubic');
//
//    $visualItem.eq(currentIndex).find('.visual-text').eq(2).stop().delay(600).animate({
//      opacity:1,
//      top:0
//    }, 1000, 'easeOutCubic');
//
//    $visualItem.eq(currentIndex-1).find('.visual-text').eq(0).stop().animate({
//      opacity:0,
//      top:-20
//    }, 1000, 'easeOutCubic');
//
//    $visualItem.eq(currentIndex-1).find('.visual-text').eq(1).stop().delay(500).animate({
//      opacity:0,
//      top:-20
//    }, 1000, 'easeOutCubic');
//
//    $visualItem.eq(currentIndex-1).find('.visual-text').eq(2).stop().delay(500).animate({
//      opacity:0,
//      top:-20
//    }, 1000, 'easeOutCubic');
//
//  };
//
//  var _autoRolling = function(){
//
//    timeID = setInterval(function(){
//      nextIndex = currentIndex + 1;
//      moveLeft(true);
//
//      if( useVisualClass ){
//        setClassVisual(nextIndex);
//      }
//    }, imageIntervalTime);
//
//    setPlayButtonClass('pause');
//  };
//
//  var _stopRolling = function(){
//
//    clearInterval(timeID);
//
//    setPlayButtonClass('play');
//
//  };
//
//  // public
//
//
//  // running in constructor when loading
//  _init();
//
//};

  /**
   * BoxModel Class
   */

  /**
   * Filter Class
   */

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