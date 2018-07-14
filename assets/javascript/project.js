//LOADING THINGS FIRST
$(document).ready(function () {
  $('.parallax').parallax();
  $('select').formSelect();
  $('input#input_text').characterCounter();
});
//FUNCTION TO DISPLAY CERTAIN MAP WITH SPECIFIC POINTS
function process() {
var operationType = $("#foodChoice").val();

if (operationType == "Fast Food") {
  initMapFastFood();
}
//Here you need to use else if instead of else
else if(operationType == "Fine Dining") {
  initMapFineDinning();
}
else if(operationType == "Vegetarian"){
  initMapVegetarian();
}
else if(operationType == "Brunch"){
  initMapBrunch();
}
}
//CALLING AJAX TO GET FOOD NUTRITION COUNTS FOR OUR APPLICATION.

function displayNutrientInfo() {

  var foodName = $("#nutrientsText").val().trim();
  var queryURL = "http://api.edamam.com/api/food-database/parser?ingr=" + foodName + "&app_id=08924846&app_key=31e56abf60782b8f390715ea87bd20aa";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
    var searchDiv = $('#foodSearch');
    var calories = response.hints[0].food.nutrients.ENERC_KCAL;
    var pOne = $('#foodCalorie').text('Calories: '+ calories);

    var protein = response.hints[0].food.nutrients.PROCNT;
    var pTwo = $('#foodProtein').text('Protein: '+ protein);

    var fat = response.hints[0].food.nutrients.FAT;
    var pThree = $('#foodFat').text('Fat: '+ fat);

    var carbs = response.hints[0].food.nutrients.CHOCDF;
    var pFour = $('#foodCarbs').text('Carbs: '+ carbs);


    pOne.replaceWith(pOne);
    pTwo.replaceWith(pTwo);
    pThree.replaceWith(pThree);
    pFour.replaceWith(pFour);
        $('#foodSearch').append(searchDiv);
    console.log(nutrients);
    
  });
 }
$(document).on("click","#nutrientsButton",displayNutrientInfo);



$(document).ready(function () {


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyARMIhddkEsqKlMSfVHwN_G2BJBmKCfMW0",
    authDomain: "project-1-8a45b.firebaseapp.com",
    databaseURL: "https://project-1-8a45b.firebaseio.com",
    projectId: "project-1-8a45b",
    storageBucket: "project-1-8a45b.appspot.com",
    messagingSenderId: "921368852818"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  $("#review-btn").on("click", function (event) {
    event.preventDefault();

    var companyName = $("#name").val().trim();
    var placeAddress = $("#address").val().trim();
    var reviewComment = $("#comment").val().trim();

    var rowAdd = $('<tr>');
    var brandName = $('<td>');
    brandName.html(companyName);

    var addressText = $('<td>');
    addressText.html(placeAddress);

    var comment = $('<td>');
    comment.html(reviewComment);


    $('tbody').append(rowAdd);

    dataRef.ref().push({
      company: companyName,
      address: placeAddress,
      comment: reviewComment,
    });

  });
  dataRef.ref().on("child_added", function (snapshot) {
    var newPost = snapshot.val();
    console.log(newPost.company);

    $("#reviewTable > tbody").append("<tr><td>" + newPost.company + "</td><td>" + newPost.address + "</td><td>" + newPost.comment + "</td></tr>");

  });
});
//WHEN PAGE LOADS THIS WILL BE THE FUNCTION TRIGURED.
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.532077, lng: -81.417754 },
    zoom: 12,
  });
}
// Fast Food Function
function initMapFastFood() {


  // FAST FOOD POINTS BEING CREATED INTO VARIABLES 


  // The map, centered at West valencia
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.532077, lng: -81.417754 },
    zoom: 12,
  });

  //MCDONALDS LOCATIONS 20MILES AROUND WEST V 
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);


  function addMarker(props) {
    console.log(props);
    service.getDetails({
      placeId: props.placeId
    }, function (place, status) {

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var image = props.pic;
        var marker = new google.maps.Marker({
          position: props.coords,
          map: map,
          icon: image,
          label: props.letter,
          content: " ",
        });
        google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent('<div id ="infoBox"><strong>' + place.name + '</strong><br>' +
            'Rating: ' + place.rating + '<br>' +
            place.formatted_address + '<br>' );
          infowindow.open(map, this);
        });
      }
    });
  }

  addMarker({
    coords: { lat: 28.515624, lng: -81.462528 },
    placeId: "ChIJhX2myx9554gRRfGOp8nEZFk",
    letter: 'MCD',
    pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
  });
  addMarker({
    coords: { lat: 28.508483, lng: -81.422806 },
    placeId: 'ChIJn9IJZON754gR3zLTZQlaX4s',
    letter: 'MCD',
    pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
  });
  addMarker({
    coords: { lat: 28.552012, lng: -81.544853 },
    placeId: 'ChIJuz_rYPaC54gR8iHQQMqQ6Tk',
    letter: 'MCD',
    pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
  });
  addMarker({
    coords: { lat: 28.551291, lng: -81.507442 },
    placeId: 'ChIJrThG9Xx454gRAcJ4isLf2Rg',
    letter: 'MCD',
    pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
  });
  addMarker({
    coords: { lat: 28.577901, lng: -81.474665 },
    placeId: 'ChIJYXXLXjJ454gR6yWTY2xw1dA',
    letter: 'MCD',
    pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
  });
  addMarker({
    coords: { lat: 28.552686, lng: -81.464263 },
    placeId: 'ChIJcbff-a5554gRUuL79WsA9Is',
    letter: 'MCD',
    pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
  });
  addMarker({
    coords: { lat: 28.577400, lng: -81.453112 },
    placeId: 'ChIJV1NcJMN554gR_a0cVC9CSJ8',
    letter: 'MCD',
    pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
  });
  addMarker({
    coords: { lat: 28.531805, lng: -81.397694 },
    placeId: 'ChIJ9xscAbF754gRf3-29wxmO2E',
    letter: 'MCD',
    pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
  });
  setTimeout(() => {
    addMarker({
      coords: { lat: 28.576690, lng: -81.415588 },
      placeId: 'ChIJySOM5w9654gRgZNSGgthv6g',
      letter: 'MCD',
      pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
    });
    addMarker({
      coords: { lat: 28.514382, lng: -81.376672 },
      placeId: 'ChIJ47QDP3N754gRB8pqyXlWi5s',
      letter: 'MCD',
      pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
    });
    addMarker({
      coords: { lat: 28.483959, lng: -81.459312 },
      placeId: 'ChIJE5ZRPcV-54gRz2vyLfqJ6do',
      letter: 'MCD',
      pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
    });
    addMarker({
      coords: { lat: 28.469348, lng: -81.451037 },
      placeId: 'ChIJLZkRpPN54gR-zsiA7jVa6I',
      letter: 'MCD',
      pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
    });
    addMarker({
      coords: { lat: 28.449518, lng: -81.480200 },
      placeId: 'ChIJNTn-06Z_54gRNL5fTfx1BCs',
      letter: 'MCD',
      pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
    });
    addMarker({
      coords: { lat: 28.450475, lng: -81.471444 },
      placeId: 'ChIJu7bMNFV-54gR-lrHScvPRX4',
      letter: 'MCD',
      pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
    });
    addMarker({
      coords: { lat: 28.423747, lng: -81.461338 },
      placeId: 'ChIJr1m0XDd-54gRhSfk9dne8aM',
      letter: 'MCD',
      pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
    });
    addMarker({
      coords: { lat: 28.447574, lng: -81.425348 },
      placeId: 'ChIJ0_XV3tR954gRtKTjk6vGcVs',
      letter: 'MCD',
      pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
    });
    addMarker({
      coords: { lat: 28.473260, lng: -81.397082 },
      placeId: 'ChIJl3bC9Wh854gR1tuAP9__Hck',
      letter: 'MCD',
      pic: 'http://maps.google.com/mapfiles/ms/micons/pink.png'
    });

  }, 4000);
  // wendys
  addMarker({
    coords: { lat: 28.578384, lng: -81.476616 },
    placeId: 'ChIJ7z5bPTJ454gRKCEcs6LEt8w',
    letter: 'WDY1',
    pic: 'http://maps.google.com/mapfiles/ms/micons/red.png'
  });
  setTimeout(() => {

    addMarker({
      coords: { lat: 28.530325, lng: -81.397581 },
      placeId: 'ChIJbT0sX7B754gRDLaKj9SWg-I',
      letter: 'WDY2',
      pic: 'http://maps.google.com/mapfiles/ms/micons/red.png'
    });
    addMarker({
      coords: { lat: 28.575524, lng: -81.373028 },
      placeId: 'ChIJR5NAVYV654gRO4tApGR5X9A',
      letter: 'WDY3',
      pic: 'http://maps.google.com/mapfiles/ms/micons/red.png'
    });
    addMarker({
      coords: { lat: 28.553536, lng: -81.353686 },
      placeId: 'ChIJW0RLNcR654gRXpMdcqgGSR8',
      letter: 'WDY4',
      pic: 'http://maps.google.com/mapfiles/ms/micons/red.png'
    });
    addMarker({
      coords: { lat: 28.537616, lng: -81.276059 },
      placeId: 'ChIJl3hp7I9l54gRLNeKKxKgJK0',
      letter: 'WDY5',
      pic: 'http://maps.google.com/mapfiles/ms/micons/red.png'
    });
    addMarker({
      coords: { lat: 28.426456, lng: -81.405362 },
      placeId: 'ChIJ1YuGkr9954gRqOdDvPJY2fQ',
      letter: 'WDY6',
      pic: 'http://maps.google.com/mapfiles/ms/micons/red.png'
    });
    addMarker({
      coords: { lat: 28.463305, lng: -81.396659 },
      placeId: 'ChIJxdajkkR854gRcTPYWq0pXQ8',
      letter: 'WDY7',
      pic: 'http://maps.google.com/mapfiles/ms/micons/red.png'
    });
    addMarker({
      coords: { lat: 28.450568, lng: -81.361721 },
      placeId: 'ChIJW0RLNcR654gRXpMdcqgGSR8',
      letter: 'WDY8',
      pic: 'http://maps.google.com/mapfiles/ms/micons/red.png'
    });
  }, 8000);

  setTimeout(() => {
    addMarker({
      coords: { lat: 28.568865, lng: -81.283834 },
      placeId: 'ChIJl3hp7I9l54gRLNeKKxKgJK0',
      letter: 'WDY9',
      pic: 'http://maps.google.com/mapfiles/ms/micons/red.png'
    });
    addMarker({
      coords: { lat: 28.480008, lng: -81.331138 },
      placeId: 'ChIJndxQTlBj54gRkW4eDInRAsA',
      letter: 'WDY10',
      pic: 'http://maps.google.com/mapfiles/ms/micons/red.png'
    });
    addMarker({
      coords: { lat: 28.513383, lng: -81.461648 },
      placeId: 'ChIJdZUHuiR554gRiRq222EUUdg',
      letter: 'WDY11',
      pic: 'http://maps.google.com/mapfiles/ms/micons/red.png'
    });
    addMarker({
      coords: { lat: 28.491309, lng: -81.428764 },
      placeId: 'ChIJ1SMxGKp-54gRVmwWe7NArr4',
      letter: 'WDY12',
      pic: 'http://maps.google.com/mapfiles/ms/micons/red.png'
    });
    addMarker({
      coords: { lat: 28.451960, lng: -81.477050 },
      placeId: 'ChIJGWV-Aqp_54gRUZ9BVZ50ViY',
      letter: 'WDY13',
      pic: 'http://maps.google.com/mapfiles/ms/micons/red.png'
    });

    //taco bell
    addMarker({
      coords: { lat: 28.551249, lng: -81.506403 },
      placeId: 'ChIJSYJtlnx454gRm1PRbF2Am9M',
      letter: 'TCB',
      pic: 'http://maps.google.com/mapfiles/ms/micons/lightblue.png'
    });
    addMarker({
      coords: { lat: 28.578444, lng: -81.441296 },
      placeId: 'ChIJcSSBcOV554gRrPkcR75GXeg',
      letter: 'TCB',
      pic: 'http://maps.google.com/mapfiles/ms/micons/lightblue.png'
    });
    addMarker({
      coords: { lat: 28.592284, lng: -81.364734 },
      placeId: 'ChIJB0i1p3Nw54gRrW9j3UsZnpQ',
      letter: 'TCB',
      pic: 'http://maps.google.com/mapfiles/ms/micons/lightblue.png'
    });
  }, 12000);

  setTimeout(() => {
    addMarker({
      coords: { lat: 28.596906, lng: -81.306585 },
      placeId: 'ChIJx-r6DJpv54gRHqlYmxfP4wo',
      letter: 'TCB',
      pic: 'http://maps.google.com/mapfiles/ms/micons/lightblue.png'
    });

    addMarker({
      coords: { lat: 28.568816, lng: -81.281608 },
      placeId: 'ChIJRcDbMI5l54gR4qwXTNEjL5c',
      letter: 'TCB',
      pic: 'http://maps.google.com/mapfiles/ms/micons/lightblue.png'
    });
    addMarker({
      coords: { lat: 28.553786, lng: -81.332762 },
      placeId: 'ChIJP0j0yzZl54gR0gfXX71CZ8A',
      letter: 'TCB',
      pic: 'http://maps.google.com/mapfiles/ms/micons/lightblue.png'
    });
    addMarker({
      coords: { lat: 28.521578, lng: -81.588163 },
      placeId: 'ChIJfdEyx-6D54gRCizezz6uamE',
      letter: 'TCB',
      pic: 'http://maps.google.com/mapfiles/ms/micons/lightblue.png'
    });
    addMarker({
      coords: { lat: 28.515875, lng: -81.484435 },
      placeId: 'ChIJJ4cjmMR454gRTwTfzP1Kx4A',
      letter: 'TCB',
      pic: 'http://maps.google.com/mapfiles/ms/micons/lightblue.png'
    });
    addMarker({
      coords: { lat: 28.514959, lng: -81.376527 },
      placeId: 'ChIJ02NCN3N754gRea9satcC7LU',
      letter: 'TCB',
      pic: 'http://maps.google.com/mapfiles/ms/micons/lightblue.png'
    });
    addMarker({
      coords: { lat: 28.520034, lng: -81.310946 },
      placeId: 'ChIJr_BH3u5k54gRYHVDxxxlEBI',
      letter: 'TCB',
      pic: 'http://maps.google.com/mapfiles/ms/micons/lightblue.png'
    });
    addMarker({
      coords: { lat: 28.487265, lng: -81.458130 },
      placeId: 'ChIJQXX_dc9-54gRldMM1PsqLeQ',
      letter: 'TCB',
      pic: 'http://maps.google.com/mapfiles/ms/micons/lightblue.png'
    });
    addMarker({
      coords: { lat: 28.483083, lng: -81.309515 },
      placeId: 'ChIJJ9Nsg2Nj54gRYtFO8kSz-A4',
      letter: 'TCB',
      pic: 'http://maps.google.com/mapfiles/ms/micons/lightblue.png'
    });
  }, 16000);

  setTimeout(() => {
    // Burger King
    addMarker({
      coords: { lat: 28.552307, lng: -81.507624 },
      placeId: 'ChIJnduFh3x454gRnkmu6lmdeJU',
      letter: 'BK1',
      pic: 'http://maps.google.com/mapfiles/ms/micons/green.png'
    });
    addMarker({
      coords: { lat: 28.573101, lng: -81.515291 },
      placeId: 'ChIJhYPpf6CC54gRyb6kQCWwg4g',
      letter: 'BK2',
      pic: 'http://maps.google.com/mapfiles/ms/micons/green.png'
    });
    addMarker({
      coords: { lat: 28.578604, lng: -81.475574 },
      placeId: 'ChIJTzq3ajJ454gR6Jm9kbTuBTw',
      letter: 'BK3',
      pic: 'http://maps.google.com/mapfiles/ms/micons/green.png'
    });
    addMarker({
      coords: { lat: 28.482316, lng: -81.457331 },
      placeId: 'ChIJ-R9eRcR-54gRkekBVW7_Bis',
      letter: 'BK4',
      pic: 'http://maps.google.com/mapfiles/ms/micons/green.png'
    });
    addMarker({
      coords: { lat: 28.473574, lng: -81.465252 },
      placeId: 'ChIJwZ_GK-d-54gR8ysVikKVEMk',
      letter: 'BK5',
      pic: 'http://maps.google.com/mapfiles/ms/micons/green.png'
    });
    addMarker({
      coords: { lat: 28.451281, lng: -81.470315 },
      placeId: 'ChIJzzHWaFV-54gRR9k2jy3D22g',
      letter: 'BK',
      pic: 'http://maps.google.com/mapfiles/ms/micons/green.png'
    });
    addMarker({
      coords: { lat: 28.470547, lng: -81.396218 },
      placeId: '',
      letter: 'BK',
      pic: 'http://maps.google.com/mapfiles/ms/micons/green.png'
    });
  }, 20000);
  // chicfila
  addMarker({
    coords: { lat: 28.449681, lng: -81.403716 },
    placeId: 'ChIJRTQmx81-54gRyh6DX-ZGQbw'
  });
  addMarker({
    coords: { lat: 28.510168, lng: -81.375735 },
    placeId: 'ChIJ0y4413N754gRQGDBIPRzJHU',
    letter:'CFA',
    pic:''
  });
  addMarker({
    coords: { lat: 28.551143, lng: -81.532852 },
    placeId: 'ChIJ9Z4CLoqC54gRfoACp0Cd6BU',
    letter:'CFA',
    pic:''
  });
  addMarker({
    coords: { lat: 28.552679, lng: -81.585020 },
    placeId: 'ChIJ9Z4CLoqC54gRfoACp0Cd6BU',
    letter:'CFA',
    pic:''
  });
  addMarker({
    coords: { lat: 28.597918, lng: -81.299730 },
    placeId: 'ChIJz2Mtnp5v54gRUZ6kB1vtqM0',
    letter:'CFA',
    pic:''
  });

  // pollo tropical
  addMarker({
    coords: { lat: 28.552386, lng: -81.488457 },
    placeId: 'ChIJH7ZPCFx454gR-prwYajhERY',
    letter:'PT',
    pic:''
  });
  addMarker({
    coords: { lat: 28.465703, lng: -81.449804 },
    placeId: '<h4>pollo1</h4>',
    letter:'PT',
    pic:''
  });
  addMarker({
    coords: { lat: 28.882390, lng: -81.403578 },
    placeId: '<h4>pollo1</h4>',
    letter:'PT',
    pic:''
  });
  addMarker({
    coords: { lat: 28.466756, lng: -81.311135 },
    placeId: '<h4>pollo1</h4>',
    letter:'PT',
    pic:''
  });
  addMarker({
    coords: { lat: 28.521069, lng: -81.309802 },
    placeId: '<h4>pollo1</h4>',
    letter:'PT',
    pic:''
  });
  addMarker({
    coords: { lat: 28.608926, lng: -81.426048 },
    placeId: '<h4>pollo1</h4>',
    letter:'PT',
    pic:''
  });
}


//fine Dining
function initMapFineDinning() {


  // FINE DINNING POINTS BEING CREATED INTO VARIABLES 


  // The map, centered at West valencia
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.532077, lng: -81.417754 },
    zoom: 12,
  });

  //MCDONALDS LOCATIONS 20MILES AROUND WEST V 19 LOCATIONS
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);


  function addMarker(props) {
    console.log(props);
    service.getDetails({
      placeId: props.placeId
    }, function (place, status) {

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var image = props.pic;
        var marker = new google.maps.Marker({
          position: props.coords,
          map: map,
          icon: image,
          label: props.letter,
        });
        google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Rating: ' + place.rating + '<br>' +
            place.formatted_address + '</div>');
          infowindow.open(map, this);
        });
      }
    });
  }
  //10-20
  addMarker({
    coords: { lat: 28.5564872, lng: -81.2030329 },
    placeId:'ChIJ5-gBZ8tn54gRM3OQZYFtRz0',
    letter:'MAH',
    pic:'http://maps.google.com/mapfiles/ms/micons/pink.png', 
  });
  //5-10
  addMarker({
    coords: { lat: 28.596067, lng: -81.350880 },
    placeId:'ChIJr0p-pxpw54gRxd5Mwt6F370',
    letter:'',
    pic:'http://maps.google.com/mapfiles/ms/micons/pink.png', 
  });
  //5-10
  addMarker({
    coords: { lat: 28.603543, lng: -81.363856 },
    placeId:'ChIJ0e5CA14m_ogRj10LUlMFJqc',
    letter:'RSH',
    pic:'http://maps.google.com/mapfiles/ms/micons/pink.png', 
  });
  //5-10
  addMarker({
    coords: { lat: 28.605562, lng: -81.365529 },
    placeId:'ChIJn9faRWpw54gRmeXyO6mDwdU',
    letter:'SH',
    pic:'http://maps.google.com/mapfiles/ms/micons/pink.png', 
  });
  //5-10
  addMarker({
    coords: { lat: 28.595968, lng: -81.356586 },
    placeId:'ChIJ2aRRAhJw54gRj-ZPlD1xpQU',
    letter:'IF',
    pic:'http://maps.google.com/mapfiles/ms/micons/pink.png', 
  });
  //5-10
  addMarker({
    coords: { lat: 28.595279, lng: -81.364904 },
    placeId:'ChIJpU_SYnJw54gRATdBmo5Ev9U',
    letter:'R',
    pic:'http://maps.google.com/mapfiles/ms/micons/pink.png', 
  });
  //1-5
  addMarker({
    coords: { lat: 28.540125, lng: -81.378305 },
    placeId:'ChIJx2A1E_5654gRvZAfgim8ETQ',
    letter:'FD',
    pic:'http://maps.google.com/mapfiles/ms/micons/pink.png', 
  });
  addMarker({
    coords: { lat: 28.450473, lng: -81.480400 },
    placeId:'ChIJO8u9Wqh_54gRb5iYbs8mFZY',
    letter:'FD',
    pic:'http://maps.google.com/mapfiles/ms/micons/pink.png', 
  });
  addMarker({
    coords: { lat: 28.452128, lng: -81.489976 },
    placeId:'ChIJo3pLtKF_54gRDYBy-uLogEM',
    letter:'FD',
    pic:'http://maps.google.com/mapfiles/ms/micons/pink.png', 
  });
}
// vegetarian
function initMapVegetarian() {


  // FAST FOOD POINTS BEING CREATED INTO VARIABLES 


  // The map, centered at West valencia
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.532077, lng: -81.417754 },
    zoom: 12,
  });

  //MCDONALDS LOCATIONS 20MILES AROUND WEST V 19 LOCATIONS
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);


  function addMarker(props) {
    console.log(props);
    service.getDetails({
      placeId: props.placeId
    }, function (place, status) {

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var image = props.pic;
        var marker = new google.maps.Marker({
          position: props.coords,
          map: map,
          icon: image,
          label: props.letter,
        });
        google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Rating: ' + place.rating + '<br>' +
            place.formatted_address + '</div>');
          infowindow.open(map, this);
        });
      }
    });
  }

  //10-20

  //10-20

  //10-20

  //5-10
  addMarker({
    coords: { lat: 28.593043, lng: -81.352887 },
    placeId: 'ChIJS733oJJ654gRysFcCVij-90'
  });
  //5-10
  addMarker({
    coords: { lat: 28.601253, lng: -81.326354 },
    placeId: '<h4>Toasted Winter Park - Vegan Truffle Melt </h4>'
  });

  //1-5
  addMarker({
    coords: { lat: 28.485954, lng: -81.432269 },
    placeId: '<h4>Maoz Vegetarian - Falafel Sandwich</h4>'
  });
  addMarker({
    coords: { lat: 28.488811, lng: -81.430359 },
    placeId: '<h4>Greenes and Grille - Salad</h4>'
  });
}
// breakfast - brunch
function initMapBrunch() {


  // FAST FOOD POINTS BEING CREATED INTO VARIABLES 


  // The map, centered at West valencia
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.532077, lng: -81.417754 },
    zoom: 12,
  });

  //MCDONALDS LOCATIONS 20MILES AROUND WEST V 19 LOCATIONS
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);


  function addMarker(props) {
    console.log(props);
    service.getDetails({
      placeId: props.placeId
    }, function (place, status) {

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var image = props.pic;
        var marker = new google.maps.Marker({
          position: props.coords,
          map: map,
          icon: image,
          label: props.letter,
        });
        google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Rating: ' + place.rating + '<br>' +
            place.formatted_address + '</div>');
          infowindow.open(map, this);
        });
      }
    });
  }
  //1-5miles
  addMarker({
    coords: { lat: 28.515549, lng: -81.483907 },
    placeId: '<h4>Kekes Breakfast Cafe - Waffle</h4>'
  });
  addMarker({
    coords: { lat: 28.511872, lng: -81.459907 },
    placeId: '<h4>Dunkin Donuts - Donuts</h4>'
  });
  addMarker({
    coords: { lat: 28.494684, lng: -81.458404 },
    placeId: '<h4>Einstein Bros. Bagels - Bagels</h4>'
  });
  addMarker({
    coords: { lat: 28.489479, lng: -81.431625 },
    placeId: '<h4>la Madeleine French Bakery & Café</h4>'
  });
  addMarker({
    coords: { lat: 28.488725, lng: -81.430123 },
    placeId: '<h4>Kekes Breakfast Cafe</h4>'
  });
  //Casual Dining - AppleBees
  addMarker({
    coords: { lat: 28.515702, lng: -81.458389 },
    placeId: '<h4>apple1</h4>'
  });
  addMarker({
    coords: { lat: 28.405477, lng: -81.456681 },
    placeId: '<h4>apple1</h4>'
  });
  addMarker({
    coords: { lat: 28.511364, lng: -81.375160 },
    placeId: '<h4>apple1</h4>'
  });
  addMarker({
    coords: { lat: 28.597202, lng: -81.210788 },
    placeId: '<h4>apple1</h4>'
  });
}
