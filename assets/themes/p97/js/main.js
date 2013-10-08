---
---

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
    $('.widget').addClass('fade-out');
    setTimeout(function () {
      $('.number').html(result.currently.apparentTemperature.toFixed(0) + '&deg;');
      if (icons[result.currently.icon]) {
        $('#climate-icon').attr('class', icons[result.currently.icon]);
      }
      $('.widget').removeClass('fade-out');
    }, 500);
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

  $(document).ready(function () {
    var $slide;

    // if (window.location.hash) {
    //   $slide = $('.item[data-hash="' + window.location.hash.replace('#', '') + '"]');
    //   $geocarousel.carousel($slide.index());
    // } else {
    //   $slide = $('.item.active');
    // }

    //if ($slide.data('image')) {
    //  $('root').backstretch('/assets/themes/p97/images/portraits/team.jpg');
    //}

    var $map = $('#map');
    var center = {lat: 45.5200, lon:  -122.6819};
    if ($map.length) {
      var map = mapbox.map($map[0], null, null, []);
      window.map = map;
      
      // Add the layer
      map.addLayer(new MM.TemplatedLayer('http://tilestream.apps.ecotrust.org/v2/magrish/{Z}/{X}/{Y}.png'));
      if ($map.data('lat') && $map.data('lng')) {
        center = {lat: $map.data('lat'), lon: $map.data('lng') };
        map.centerzoom(center,5);
        updateWeather($map.data('lat'), $map.data('lng'));
      } else if ($map.hasClass('short-map')) {
        map.centerzoom(center,3);
        updateWeather(center.lat, center.lon);
      } else if ($map.length && ! $map.hasClass('header')) {
        map.centerzoom(center,2);
        map.ease.location({ lat: center.lat, lon: center.lon -1 }).zoom(6).optimal();  
        updateWeather(center.lat, center.lon);
        
        var markers = mapbox.markers.layer().url('data/places.geojson');
        // markers.factory(function(f) {
        //     var img = document.createElement('img');
        //     img.setAttribute('src', 'data/marker.png');
        //     return img;
        // });
        map.addLayer(markers);
      } 

      // if ($map.data('lat2') && $map.data('lat2')) {
      //   setInterval(function () {
      //     map.ease.location({ lat: $map.data('lat2'), lon: $map.data('lng2') -1 }).zoom(6).optimal();
      //   }, 1000)
      // }

      // Attribute
      map.ui.attribution.add()
          .content('<a href="http://mapbox.com/about/maps">Terms &amp; Feedback</a>');
    
    } else {
      updateWeather(center.lat, center.lon);
    }
    
    var $geocarousel = $('#geocarousel');
    if ($geocarousel.length) {
      $geocarousel.carousel({
        interval: 10000
      });

      $geocarousel.on('slide.bs.carousel', function (e) {
        var $slide = $(e.relatedTarget);
        var lat = $slide.data('lat');
        var lng = $slide.data('lng');
        var zoom = $slide.data('zoom') || 7;
        // if ($slide.data('hash')) {
        //   window.location.hash = $slide.data('hash');
        // } else {
        //   window.location.hash = "";
        // }

        $('iframe').remove();
        $('.active-data').text("View Data");
        if ($map.length && lat && lng) {
          updateWeather(lat, lng);
          map.ease.location({ lat: lat, lon: lng - 1 }).zoom(zoom).optimal();
        } else if ($map.length) {
          updateWeather(center.lat, center.lon);
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
    }


    $('.lens').on('click', '.view-btn', function (e) {
      var $button = $(e.target).closest('.btn');
      var embed = $button.data('embed');
      var iframe = $('#carousel-wrapper').find('iframe');
      if (iframe.length) {
        $(iframe).remove();
        $button.text("View Data");
        $geocarousel('cycle');
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
          $geocarousel('pause');
        }, 3000);
      }

    });




    // $('.widget').popover({
    //   placement: 'bottom',
    //   content: "test",
    //   title: "Current Weather",
    //   trigger: "manual"
    //   // trigger: "hover"
    // }).popover('show');

    // $('.root').on('swipeleft', function(e) {
    //   $geocarousel.carousel('prev');
    // }).on('swiperight', function(e) {
    //   $geocarousel.carousel('next');
    // });  
    $('.root').swipe({
      swipeLeft:function(event, direction, distance, duration, fingerCount) {
        $geocarousel.carousel('prev');
      },
      swipeRight:function(event, direction, distance, duration, fingerCount) {
        $geocarousel.carousel('prev');
      },
      threshold: 25
    });
  });

})();
