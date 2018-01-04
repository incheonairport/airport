/***************
 * Layer Class *
 ***************/

var MobileGnb, ArrangeBusStop;

$(function(){

  /**
   * MobileGnb
   */

  MobileGnb = new function(){

    this.mobileOnOffMenu = function( type ){

      if(type=='on'){
        $('.header').animate({left:0},350);
        $('.mobile-header').addClass('active');
      } else {
        $('.header').animate({left: -100 + '%'},350);
        $('.mobile-header').removeClass('active');
      }

    };

  };

  /**
   * ArrangeBusStop
   */

  ArrangeBusStop = new function(){

    var busStop = {

      $node : $('.route-bus-line-list > .route-bus-line-list-article'),

      allNumber : $('.route-bus-line-list > .route-bus-line-list-article').length,

      topNumber : 0,

      bottomNumber : 0,

      topGap : 0,

      bottomGap : 0

    };

    this.setArrange = function(){

      busStop.topNumber = Math.ceil(busStop.allNumber / 2);
      busStop.bottomNumber = busStop.allNumber - busStop.topNumber;
      busStop.topGap = 100 / (busStop.topNumber - 1);
      busStop.bottomGap = 100 / (busStop.bottomNumber - 1);

      for(var i=0; i<busStop.topNumber; i++){

        busStop.$node.eq(i).addClass('top').css({
          left: busStop.topGap * i + '%'
        });

      }

      for(var j=0; j<busStop.bottomNumber; j++ ){

        busStop.$node.eq(j + busStop.topNumber).addClass('bottom').css({
          left: busStop.bottomGap * j + '%'
        });

      }

    };

    this.setBusStopPosition = function(){

      $('.bus-stop-index').each(function(i){
        $('.route-bus-stop-ico-box').append('<p class="exit exit-' + $(this).text() + '">' + $(this).text() + '번 출구</p>')
      });

    };

    this.setArrange();

    this.setBusStopPosition();

  };

});


$(function(){

  // map scroll overflow div add
  function mobileMapExtendEvent() {
    $('.imgbox').wrap('<div class="imgbox-extend" />');
  } mobileMapExtendEvent();


});

