$(function(){

  // table like

  var TableLike = function(){

    var $table = $('.table-like');
    var tableNum = $table.length;

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

  var t;
  t = new TableLike();

  $('.flight-info-basic-link').on('click', function(e){
    //console.log(586567);
  });

  $('.btn-newsflash').on('click', function(e){
    e.stopPropagation();
    //console.log(1212);
  });

});

$(function(){

  // function
  function tabAction(){
    var tabWidth = 0;
    var $tabWrap;

    try{
      $tabWrap = $('.tab-nav');

      $tabWrap.each(function(){

        if( $(html).hasClass('mobile') ){

          tabWidth = 100 / Math.ceil( $(this).find('.tab-nav-list-item').length / 2 );

          //console.log(tabWidth);

          $(this).find('.tab-nav-list-item').css({
            width: tabWidth + '%'
          });

        } else {

          tabWidth = 100 / $(this).find('.tab-nav-list-item').length;

          $(this).find('.tab-nav-list-item').css({
            width: tabWidth + '%'
          });

        }

      });

    } catch(e){}

    try{

      $tabWrap = $('.tab-area');

      $tabWrap.each(function(){

        tabWidth = 100 / $(this).find('.tab-area-heading').length;

        $(this).find('.tab-area-heading').css({
          width: tabWidth + '%'
        });

        $(this).find('.tab-area-heading').each(function(i){
          $(this).css({
            left : (i * tabWidth) + '%'
          });
        });

      });


    } catch(e) {}

    $('.tab-area-heading').on('click', function(){

      $(this).siblings('.tab-area-heading').removeClass('on').next('.tab-area-content').removeClass('on');

      $(this).addClass('on').next('.tab-area-content').addClass('on')

    });
  }

  // run
  tabAction();


});

$(document).ready(function(){

  gnb(); // gnb
  selectLinkTypeEvent(); // 링크타입 셀렉트박스 이벤트
  filterEvent(); // 필터 관련 펼치기 이벤트 :: 기본타압3
  boxmodelEvent(); // 박스모델 세부사항 펼치기 이벤트 :: 기본타압3
  //slideButtonEvent(); // 해당 여객터미널 컨텐츠 슬라이딩 이벤트 AP_DC

  function gnb(){

    $('.gnb-depth1-link').on('mouseenter', function(){
      $('.gnb').addClass('on');
    });

    $('.gnb').on('mouseleave', function(){
      $('.gnb').removeClass('on');
    });
  }
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

  }
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
  }
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
  }
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

$(function(){

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

  function initClass(){
    $('.header, .gnb').addClass( $('.full-page-content').find('.section').eq(0).data('gnb-color') );
  }

  function setClassVisual(index){
    $('.header').attr('class', 'header ' + $visualItem.eq(index).data('gnb-color') );
    $('.gnb').attr('class', 'gnb ' + $visualItem.eq(index).data('gnb-color') );
  }

  function setClassSection(index){
    $('.header').attr('class', 'header ' + $mainSection.eq(index).data('gnb-color') );
    $('.gnb').attr('class', 'gnb ' + $mainSection.eq(index).data('gnb-color') );
  }

  function init(){

    $visualItem.css({left:'100%'}).eq(0).css({left:0});
    $visualItem.eq( $visualItem.length-1 ).css({left:'-100%'});

    initClass();

    paging();

  }

  function paging(){

    var $paging = $('<ul class="paging-visual"></ul>');
    $('.main-visual-control-paging').prepend($paging);

    for(var i=0; i<$visualItem.length; i++){

      $paging.append('<li class="paging-item"><a href="#" class="paging-link">' + (i+1) + '</a></li>');

    }

    $pageItem = $('.paging-item');
    $pageItem.removeClass('on');
    $pageItem.eq(0).find('.paging-link').addClass('on');

  }

  function timeBar(){
    var barStretch = 0;
    var unitLength = 100 / ( (imageIntervalTime-imageMovingTime) / barStretchTime );

    timeID2 = setInterval(function(){
      $('.main-visual-control-bar').css({width:barStretch + '%'});
      barStretch += unitLength;
    }, barStretchTime);

  }

  function textMotion(){

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

  }

  function moveLeft(){

    if( nextIndex >= $visualItem.length ){
      nextIndex = 0;
    }

    $visualItem.eq(currentIndex).stop().animate({left:'-100%'}, imageMovingTime, easingType);
    $visualItem.eq(nextIndex).css({left:'100%'}).stop().animate({left:0}, imageMovingTime, easingType, function(){
      clearInterval(timeID2);
      timeBar();
      textMotion();
    });

    $pageItem.find('.paging-link').removeClass('on');
    $pageItem.eq(nextIndex).find('.paging-link').addClass('on');

    currentIndex = nextIndex;

  }

  function autoRolling(){

    timeID = setInterval(function(){
      nextIndex = currentIndex + 1;
      moveLeft();
      if( useVisualClass ){
        setClassVisual(nextIndex);
      }
    }, imageIntervalTime);
  }


  // running
  init();

  timeBar();
  autoRolling();
  setTimeout(function(){
    textMotion();
  }, 1000);



  function sectionBgInit(){

    $('.full-page-content .section-main-bg').css({
      top:-480
    });

  }

  function sectionBgDown(mainSectionIndex){

    $mainSection.eq(mainSectionIndex).find('.section-main-bg').animate({
      top:0
    }, 1000, 'easeOutQuad');

  }

  function sectionBgUp(mainSectionIndex){

    $mainSection.eq(mainSectionIndex).find('.section-main-bg').delay(100).animate({
      top:-480
    }, 900, 'easeOutQuad');

  }

  if( $('.full-page-content').length > 0 ){

    sectionBgInit();

    $('.full-page-content').fullpage({
      //scrollBar: true,
      scrollingSpeed: 1000,
      onLeave: function(sectionIndex, sectionNextIndex, direction){

        mainSectionIndex = sectionNextIndex;

        if( direction == 'down' ){

          sectionBgDown(mainSectionIndex-1);

        } else {

          sectionBgUp(sectionIndex-1);

        }

        if( useSectionClass ){

          if( mainSectionIndex > 1 ){
            useVisualClass = false;
            setClassSection(mainSectionIndex-1);
          } else {
            useVisualClass = true;
            setClassVisual(nextIndex);
          }

        }

      }

    });

  }

  $('.header, .gnb').on('mouseenter', function(){
    useVisualClass = false;
    useSectionClass = false;
    $('.header').attr('class', 'header');
    $('.gnb').attr('class', 'gnb');
  });

  $('.header, .gnb').on('mouseleave', function(){
    useVisualClass = true;
    useSectionClass = true;

    if( useSectionClass ){

      if( mainSectionIndex > 1 ){
        useVisualClass = false;
        setClassSection(mainSectionIndex-1);
      } else {
        useVisualClass = true;
        setClassVisual(nextIndex);
      }

    }

  });

});



