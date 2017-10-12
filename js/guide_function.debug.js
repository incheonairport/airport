$(function(){

  var item = [];

  $.getJSON('data/file_list.json', function(data){

    $.each(data, function(key, val){

      item[key] = val.split('.')[0];

    });

  }).done(function(){

    $('tbody tr').each(function(){

      for(var j=0; j<item.length; j++){

        if( $(this).children('td:last-child').text() == item[j] ){
          $(this).append('<td class="center"><a href="../html/' + item[j] + '.html" class="list-link" target="blonk"> DONE </a></td>');
          break;
        } else {
          if( j == item.length-1 ){
            $(this).append('<td class="center">X</td>');
          }
        }

      }

    });

  });

});