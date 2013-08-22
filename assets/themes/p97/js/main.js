
(function () {
  var icons = {
    "clear-day": "climacon sun",
    "clear-night": "climacon moon",
    "rain": "climacon downpour",
    "snow": "climacon snow",
    "sleet": "climacon sleet",
    "wind": "climacon wind cloud",
    "fog": "climacon fog",
    "cloudy": "climacon cloud",
    "partly-cloudy-day": "climacon cloud sun",
    "partly-cloudy-night": "climacon cloud moon"
  }

  var weather = {};

  var displayWeather = function (result) {
    $('.number').html(result.currently.apparentTemperature.toFixed(0) + '&deg;');
    if (icons[result.currently.icon]) {
      $('#climate-icon').attr('class', icons[result.currently.icon]);
    }
  }

  var updateWeather = function (lat, lng) {
    var coords = lat + ',' + lng;
    if (weather[coords]) {
      displayWeather(weather[coords]);
    } else {
      $.ajax({
        url: 'https://api.forecast.io/forecast/a925f9ca0ac1387ddf9be8ab28a3ee43/' + coords,
        dataType: 'JSONP',
        success: function (result) {
          weather[coords] = result;
          displayWeather(result);
        } 
      })  
    }
    
    
  }

  var map = mapbox.map('map', null, null, []);
  var center = {lat: 45, lon: -123 };
  // Add the layer
  map.addLayer(new MM.TemplatedLayer('http://tilestream.apps.ecotrust.org/v2/magrish/{Z}/{X}/{Y}.png'));
  map.centerzoom(center,2);
  map.ease.location(center).zoom(5).optimal();
  // Attribute
  map.ui.attribution.add()
      .content('<a href="http://mapbox.com/about/maps">Terms &amp; Feedback</a>');

  var $geocarousel = $('#geocarousel').carousel({
    interval: 30000
  });
  $geocarousel.on('slide.bs.carousel', function (e) {
    var $slide = $(e.relatedTarget);
    var lat = $slide.data('lat');
    var lng = $slide.data('lng');
    var zoom = $slide.data('zoom') || 7;
    $('iframe').remove();
    $('.active-data').text("View Data");
    if (lat && lng) {
      updateWeather(lat, lng);
      map.ease.location({ lat: lat, lon: lng - 1 }).zoom(zoom).optimal();
    } else {
      map.ease.location(center).zoom(5).optimal();
    }
  });

  $("body").keydown(function(e) {
    if(e.keyCode == 37) { // left
      $geocarousel.carousel('prev');
    }
    else if(e.keyCode == 39) { // right
      $geocarousel.carousel('next');
    }
  });


  updateWeather(44, -122);


  $(document).ready(function () {

    $('.lens').on('click', '.btn', function (e) {
      var $button = $(e.target).closest('.btn');
      var embed = $button.data('embed');
      var iframe = $('#carousel-wrapper').find('iframe');
      if (iframe.length) {
        $(iframe).remove();
        $button.text("View Data");
      } else {
        $button.attr('disabled', true);
        $button.text("Loading Data");
        $('#carousel-wrapper').append($('<iframe/>', {
          src: embed,
          class: "hidden"
        }));
        setTimeout(function () {
          $('#carousel-wrapper').find('iframe').removeClass('hidden');
          $button.removeAttr('disabled');
          $button.addClass('active-data');
          $button.text("Hide Data");
        }, 5000);
      }

    });


    $('.widget').popover({
      placement: 'bottom',
      content: "test",
      trigger: "hover"
    })

    $('body').on('swipeleft', function(e) {
      $geocarousel.carousel('prev');
    }).on('swiperight', function(e) {
      $geocarousel.carousel('next');
    });  
  });

})();
