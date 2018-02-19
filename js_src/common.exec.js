/********************
 * Common Execution *
 ********************/



$(document).ready(function(){





});

$(function(){
  //scroll tab


  (function(){
    //var _focus = $(this);
    //if($('.layer-wrap').hasClass('on')){
    //  $('.layer').attr("tabindex", "0").focus();
    //}
    //
    //$('.layer-close').on('click', function(){
    //  _focus.focus();
    //});


    //$('.local-list.tab-half').wrap('<div class="tab-scroll-x" />');

    //$(window).on('resize', function(){
    //
    //  if( $('.local').width() >= 858 ){
    //
    //    $('.local-list-item').css({width : ($('.local-list').width() / $('.local-list-item').length )});
    //    $('.local-list').css({width : 'auto'});
    //
    //  } else {
    //    $('.local-list-item').outerWidth(78);
    //    $('.local-list').width( $('.local-list-item').outerWidth() * $('.local-list-item').length );
    //
    //  }
    //});
  })();

  /**
   * 날짜 선택
   */

  (function(){

    $('.timesetting-date-calendar').on('click', function(){

      CalendarPopup.showDatePicker($(this), 'show');

    });

    $('body').on('click', '.js-from-button', function(){

      CalendarPopup.showDatePicker($(this), 'show');

    });

    $('body').on('click', '.js-to-button', function(){

      CalendarPopup.showDatePicker($(this), 'show');

    });

  })();

  /**
   * 셀렉트 리스트
   */

  (function(){

    $('.select-link-default').data('open', false).on('click', function(){

      if( !$(this).data().open ){
        SelectBox.toggleSelectList( $(this) );
      } else {
        SelectBox.hideList(e);
      }

    });

    $('.select-list .select-list-link').on('click',function(){

      SelectBox.afterClickList( $(this) );

    });

  })();



  /**
   * 필터
   */

  (function(){

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

  })();

  /**
   * 탭
   */

  (function(){

    $('.tab-area-heading').on('click', function(){

      $(this).siblings('.tab-area-heading').removeClass('on').next('.tab-area-content').removeClass('on');

      $(this).addClass('on').next('.tab-area-content').addClass('on')

    });

    $('.btn-type-tab').on('click', function(){

      $(this).siblings('.btn-type-tab').removeClass('on');

      $(this).addClass('on');

    });

  })();
  (function(){

    $('.tab-area-heading').on('click', function(){

      $(this).siblings('.tab-area-heading').removeClass('on').next('.tab-area-content').removeClass('on');

      $(this).addClass('on').next('.tab-area-content').addClass('on')

    });

    $('.btn-type-tab').on('click', function(){

      $(this).siblings('.btn-type-tab').removeClass('on');

      $(this).addClass('on');

    });

  })();

  /**
   * 레이어 팝업
   */

  (function(){

    $(window).on('resize', function(){

      LayerPopup.setPopupHeight();

    });

    $('body').on('click', function(){

      if( $('.layer-wrap').hasClass('on') ){

        LayerPopup.setPopupHeight();

      }

    });

  })();


  (function(){

    if($(window).outerWidth() <= 1080){
      var tabArea = $('.tab-nav-list');
      var tabOnText = $('.tab-nav-list-link.on').text();
      tabArea.prepend('<li class="menu-mobile-item"><button type="button" class="menu-mobile-ui"><span>메뉴선택</span></button></li>');
      $('.menu-mobile-ui span').text(tabOnText);
      $('.tab-nav-list .menu-mobile-ui').on('click', function(){
        $(this).parent().siblings().toggleClass('open-ui');
      });
    }




    //function onload( callback ) {
    //  if(window.addEventListener){
    //    window.addEventListener('load', callback)
    //  }else{
    //    window.attachEvent('onload', callback)
    //  }
    //}
    //
    //onload( function() {
    //  document.querySelectorAll('table.vt-dark-res').forEach(function(element) {
    //    var table  = element,
    //        theads = Array.prototype.slice.call(table.querySelectorAll('th')).map(function(value) {
    //          return value.innerHTML;
    //        });
    //
    //    table.querySelectorAll('tr').forEach(function( tr ) {
    //      tr.querySelectorAll('td').forEach(function( td, y ) {
    //        td.setAttribute('data-th', theads[y]);
    //      });
    //    });
    //
    //  });
    //});


  })();

});


