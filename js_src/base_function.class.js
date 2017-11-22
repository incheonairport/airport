/**************
 * Base Class *
 **************/

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

$(document).ready(function(){

  function selectLinkTypeEvent(){
    $('.select-link-default').on('click', function(){
      $(this).toggleClass('on');
      $(this).next('.select-list').toggleClass('on');
    });

    $('.select-list .select-list-link').on('click',function(){
      $(this).parents('.select-list').removeClass('on')
      $(this).parents('.select-list').prev('.select-link-default').removeClass('on');
    });

    // document 클릭시 remove class...
    $(document).mouseup(function (e) {
      var container = $('.select-list');
      if (!container.is(e.target) && container.has(e.target).length === 0){
        container.removeClass('on');
        $('.select-link-default').removeClass('on');
      }
    });

  } //v
  function boxmodelEvent(){
    var listItem = $('.boxmodel2-list-item');
    $('.boxmodel2-list-item .btn-type-small').on('click', function(){
      $(this).parents(listItem).toggleClass('on');
      if($(this).parents(listItem).hasClass('on')) {
        $(this).text('닫기');
      } else {
        $(this).text('펼치기');
      }
    });
  } //v
  function filterEvent(){
    $('.filter .filter-brand-search-btn').on('click', function(){
      $(this).toggleClass('on');
      $(this).parents('.filter').toggleClass('on');
    });

    $('.filter .base-close').on('click', function(){
      $(this).parents('.filter').removeClass('on');
    });

    $('.filter .filter-option').on('click', function(){
      $(this).toggleClass('on');
      $(this).next('.filter-service-field').toggleClass('on');
      //$(this).next('.filter-service-field').toggleClass('off');
    });
  } //v

  selectLinkTypeEvent(); // 링크타입 셀렉트박스 이벤트
  filterEvent(); // 필터 관련 펼치기 이벤트 :: 기본타압3
  boxmodelEvent(); // 박스모델 세부사항 펼치기 이벤트 :: 기본타압3
  //slideButtonEvent(); // 해당 여객터미널 컨텐츠 슬라이딩 이벤트 AP_DC

  //function slideButtonEvent(){
  //  $('.btn-terminal1').on('click', function(){
  //    $('html,body').animate({
  //      scrollTop: $('.terminal1').offset().top - 120
  //    }, 'slow');
  //  });
  //
  //  $('.btn-terminal2').on('click', function(){
  //    $('html,body').animate({
  //      scrollTop: $('.terminal2').offset().top - 120
  //    }, 'slow');
  //  });
  //}
});


