$(function(){

  /**
   * define
   */

  var item = [];
  var itemFlag = [];
  var fileData = [];

  var $record = $('.file-list tbody tr');

  var count = new Array(12).fill(0);
  var pageCount = 1;

  // each data split filename and ext
  function splitData(data){

    $.each(data, function(key, val){

      item[key] = val.split('.')[0];

    });

  }

  // add class name each case ex. cancel/category/link/page(O/X)
  function addClassname($record){

    var $children = $record.children('td');
    var childrenText = $children.eq(6).text().toLowerCase();

    if($children.has('s').length){

      $record.addClass('cancel');

    } else {

      if( $children.eq(7).text().indexOf('*') >= 0){

        childrenText = 'extra-';

      } else {

        childrenText = childrenText ? childrenText + '-' : childrenText;

      }

      $record.addClass(childrenText + 'category');

    }

  }

  // find same filename and put link html code or X
  function compareFile($record){

    if(!$record.hasClass('cancel') && !$record.hasClass('category') && !$record.hasClass('link-category')){

      for(var j=0; j<item.length; j++){

        if( $record.children('td:nth-child(8)').text() == item[j] ) {

          $record.prepend('<td>'+ pageCount +'</td>');
          $record.addClass('done').append('<td class="center"><a href="../html/' + item[j] + '.html" class="list-link" target="blank"> DONE </a></td>');
          itemFlag[j] = true;
          pageCount++;
          break;

        } else if( $record.children('td:nth-child(8)').text().indexOf('*') >= 0 ){

          $record.prepend('<td></td>');
          $record.append('<td></td>');
          break;

        } else {

          if( j == item.length-1 ){
            $record.prepend('<td>'+ pageCount +'</td>');
            $record.append('<td class="center">X</td>');
            pageCount++;
          }

        }
      }

    } else {
      $record.prepend('<td></td>');
      $record.append('<td></td>');

    }
  }

  // find unmatch filename and log
  function unmatchFile(){
    for(var k=0; k<itemFlag.length; k++){
      if( itemFlag[k] != true ){
        fileData.push(item[k]);
      }
    }
    console.log(fileData);
  }

  // write each count number
  function outputProgress() {

    $record.each(function () {

      var className = $(this).attr('class');

      if (className == 'cancel') {

        // number of cancel page
        count[0]++;

      } else if (className == 'category') {

        // number of category
        count[1]++;

      } else {

        // number of working page
        count[2]++;

        if (className.toLowerCase().indexOf('html') >= 0) {
          // number of html page
          count[3]++;
        } else if (className.toLowerCase().indexOf('develop') >= 0) {
          // number of develop page
          count[4]++;
        } else if (className.toLowerCase().indexOf('board') >= 0) {
          // number of board page
          count[5]++;
        } else if (className.toLowerCase().indexOf('link') >= 0) {
          // number of link
          count[6]++;
        } else if( className.toLowerCase().indexOf('extra') >= 0 ){
          // number of extra
          count[11]++;
        }

        if (className.toLowerCase().indexOf('done') >= 0) {
          // number of done page
          count[7]++;

          if (className.toLowerCase().indexOf('html') >= 0) {
            // number of done html page
            count[8]++;
          } else if (className.toLowerCase().indexOf('develop') >= 0) {
            // number of done develop page
            count[9]++;
          } else if (className.toLowerCase().indexOf('board') >= 0) {
            // number of done board page
            count[10]++;
          }
        }

      }

    });

    console.log(count[2]);

    $('.progress-all .progress-bar').css({width: Math.floor(count[7] / (count[2]-count[11]) * 100) + '%'}).html('<div class="progress-percent">' + Math.floor(count[7] / (count[2]-count[11]) * 100) + '%</div>');

    $('.all-work').text( (count[2]-count[11]) + 'p');
    $('.done-work .progress-bar').css({width: Math.floor(count[7] / (count[2]-count[11]) * 100) + '%'}).html('<div class="progress-percent">' + (count[7] - count[11]) + 'p</div>');

    $('.all-work-html').text(count[3] + 'p');
    $('.done-work-html .progress-bar').css({width: Math.floor(count[8] / count[3] * 100) + '%'}).html('<div class="progress-percent">' + count[8] + 'p</div>');

    $('.all-work-board').text(count[4] + 'p');
    $('.done-work-board .progress-bar').css({width: Math.floor(count[9] / count[4] * 100) + '%'}).html('<div class="progress-percent">' + count[9] + 'p</div>');

    $('.all-work-develop').text(count[5] + 'p');
    $('.done-work-develop .progress-bar').css({width: Math.floor(count[10] / count[5] * 100) + '%'}).html('<div class="progress-percent">' + count[10] + 'p</div>');
  }

  /**
   * run
   */

  // ajax
  $.getJSON('file_list.json', function(data){

    splitData(data);

  }).done(function(){

    $record.each(function(){

      addClassname($(this));

      compareFile($(this));

    });

    unmatchFile();

    outputProgress();

  });

  // show each list

  $('body').on('click', '.js-show-all', function(){

    $('.btn-type-small').removeClass('on');

    var showCategory = $(this).attr('class').split(' ')[4];

    $(this).addClass('on');

    $('.file-list tbody tr').addClass('hide');

    if( showCategory == undefined ){
      $('.file-list tbody tr').removeClass('hide');
    } else {
      $('.file-list tbody tr.' + showCategory + '-category').removeClass('hide');
    }

  });

  $('body').on('click', '.js-show-done', function(){

    $('.btn-type-small').removeClass('on');

    var showCategory = $(this).attr('class').split(' ')[4];

    $(this).addClass('on');

    $('.file-list tbody tr').addClass('hide');

    if( showCategory == undefined ){
      $('.file-list tbody tr.done').removeClass('hide');
    } else {
      $('.file-list tbody tr.' + showCategory + '-category.done').removeClass('hide');
    }

  });

  // link or alert message
  $('body').on('click', '.file-list tr', function(e){

    console.log( $(this).hasClass('cancel') );

    if( $(this).find('.list-link').length ){

      window.open($(this).find('.list-link').attr('href'));

    } else if( $(this).hasClass('cancel') ){

      alert('제작이 취소된 페이지 입니다')

    } else {

      alert('준비 중 입니다.');

    }

  });

  // tab

  $('.tab-sub-list-link').on('click', function(e){
    e.preventDefault();

    var $tab = $('.tab-sub-list-link');
    var $tabContents = $('.tab-contents');

    var index = $tab.index( $(this) );

    $tab.removeClass('on');
    $(this).addClass('on');

    $tabContents.removeClass('on');
    $tabContents.eq(index).addClass('on');

  });

});