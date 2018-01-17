/********************
 * Common Execution *
 ********************/

$(function(){
  //scroll tab


  (function(){
    //var listWidth = $('.half li').width();
    var listWidth = $('.local-list.tab-half').children('li').width();
    var listCount = $('.local-list.tab-half').children('li').length;
    $('.local-list.tab-half').wrap('<div class="tab-scroll-x" />');
    $('.local-list.tab-half').width(listWidth * listCount);
    //
    //console.log(listCount);
    //console.log(listWidth);
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

  /**
   * 레이어 팝업
   */

  (function(){

    $(window).on('resize', function(){

      LayerPopup.setPopupHeight();

    });

  })();

});


