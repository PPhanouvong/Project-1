
$(document).ready(function(){
    $('.parallax').parallax();
    $('select').formSelect();
    $('input#input_text').characterCounter();
  });

  var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
          center: {lat: 28.5383, lng: -81.3792},
          zoom: 12
        });
      }
