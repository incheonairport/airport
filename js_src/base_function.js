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
    console.log(586567);
  });

  $('.btn-newsflash').on('click', function(e){
    e.stopPropagation();
    console.log(1212);
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

        tabWidth = 100 / $(this).find('.tab-nav-list-item').length;

        $(this).find('.tab-nav-list-item').css({
          width: tabWidth + '%'
        });

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
  slideButtonEvent(); // 해당 여객터미널 컨텐츠 슬라이딩 이벤트 AP_DC

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
  function slideButtonEvent(){
    $('.btn-terminal1').on('click', function(){
      $('html,body').animate({
        scrollTop: $('.terminal1').offset().top - 120
      }, 'slow');
    });

    $('.btn-terminal2').on('click', function(){
      $('html,body').animate({
        scrollTop: $('.terminal2').offset().top - 120
      }, 'slow');
    });
  }
});



