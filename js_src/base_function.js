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