$(function(){

  /**
   * define
   */

  var item = [];
  var itemFlag = [];
  var fileData = [];

  var $record = $('.file-list tbody tr');

  var count = new Array(11).fill(0);

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

      childrenText = childrenText ? childrenText + '-' : childrenText;

      $record.addClass(childrenText + 'category');

    }

  }

  // find same filename and put link html code or X
  function compareFile($record){

    if(!$record.hasClass('cancel') && !$record.hasClass('category') && !$record.hasClass('link-category')){

      for(var j=0; j<item.length; j++){

        if( $record.children('td:last-child').text() == item[j] ){

          $record.addClass('done').append('<td class="center"><a href="../html/' + item[j] + '.html" class="list-link" target="blank"> DONE </a></td>');
          itemFlag[j] = true;
          break;

        } else {

          if( j == item.length-1 ){
            $record.append('<td class="center">X</td>');
          }

        }
      }

    } else {

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
  function outputProgress(){

    $record.each(function(){

      var className = $(this).attr('class');

      if( className == 'cancel' ){

        // number of cancel page
        count[0]++;

      } else if( className == 'category' ){

        // number of category
        count[1]++;

      } else {

        // number of working page
        count[2]++;

        if( className.toLowerCase().indexOf('html') >= 0 ){
          // number of html page
          count[3]++;
        } else if(className.toLowerCase().indexOf('develop') >= 0){
          // number of develop page
          count[4]++;
        } else if(className.toLowerCase().indexOf('board') >= 0){
          // number of board page
          count[5]++;
        } else if(className.toLowerCase().indexOf('link') >= 0){
          // number of link
          count[6]++;
        }

        if(className.toLowerCase().indexOf('done') >= 0){
          // number of done page
          count[7]++;

          if( className.toLowerCase().indexOf('html') >= 0 ){
            // number of done html page
            count[8]++;
          } else if(className.toLowerCase().indexOf('develop') >= 0){
            // number of done develop page
            count[9]++;
          } else if(className.toLowerCase().indexOf('board') >= 0){
            // number of done board page
            count[10]++;
          }
        }

      }

    });

    console.log(count);

    //$('.page-whole-num').text(wholeCount);
    //$('.page-current-num').text(doneCount);
    //$('.progress-bar').css({width : Math.floor(doneCount/wholeCount*100) + '%'}).html('<div class="progress-percent">' + Math.floor(doneCount/wholeCount*100) + '%</div>');
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


  // link or alert message
  $('body').on('click', '.file-list tr', function(e){

    if( $(this).find('.list-link').length ){

      window.open($(this).find('.list-link').attr('href'));

    } else if( $(this).find('.cancel').length ){

      alert('제작이 취소된 페이지 입니다')

    } else {

      alert('준비 중 입니다.');

    }

  });

});