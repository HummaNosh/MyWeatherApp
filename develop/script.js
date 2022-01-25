//
var formEl = $("#city-form");
var CityName = $("#citynames");
var CityList = $("#searchedlist");
var SearchBtn = $("#SearchBtn");
var apikey = "ead377de503e1fdb3cf49c83815322d2";

// ---------------------------------------------------------------------------------------

// SEARCH BOX, CITY LISTED AND BUTTON

var SearchBoxing = function (event) {
  event.preventDefault();

  // User inputs a city in the search box, which then does the PrintCities job...
  var NameInput = CityName.val();
  PrintCities(NameInput);
};

SearchBtn.on("click", SearchBoxing);

// Cities to be printed in a list...
var PrintCities = function (name) {
  var listEl = $("<li>");
  var listDetail = name.concat("");
  listEl.addClass("list-group-item").text(listDetail);
  listEl.appendTo(CityList);
  console.log("button clicked");
  // --------------------------------------------------------
};

// -----------------------------------------------------------------------------------

// Searched cities, turned into buttons that will take them to information they want...

$(document).on("click", "li", function () {
  var PickCity = $(this).text();
  Weather(PickCity);
});

// The below decide where each parameter will be printed..
function GrabInfo(para1, para2, para3, para4, para5) {
  $("#cityname").text(para1);
  $("#todaysdate").text(para2);
  $("#tempbox").text("Temperature : " + para3 + " °F");
  $("#windbox").text("Wind : " + para5 + " MPH");
  $("#humbox").text("Humidity : " + para4 + " %");
}

//Grab info from open weather API..

function Weather(para1) {
  var apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${para1}&appid=${apikey}`;

  fetch(apiurl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        Display();
        // Each parameter based on 'position' in url.., as a variable for line 65
        var CityMain = data["name"];
        var Temp = data["main"]["temp"];
        var Humidity = data["main"]["humidity"];
        var Wind = data["wind"]["speed"];
        var Date = moment().format("MMMM Do YYYY");

        // variables/parameters displayed as described in function Grabinfo
        GrabInfo(CityMain, Date, Temp, Wind, Humidity);

        console.log(CityMain);
        console.log(Date);
        // ------------------------------------------------------------------------------------------------------
      });
    }

    function some(para1, para2, para3) {
      $("#forecast").text(para1);
      $("#tempforecast").text(para2);
      $("#humforecast").text(para3);
    }
    function Display(CityMain) {
      var url = `https://api.openweathermap.org/data/2.5/forecast?q=${CityMain}&appid=${apikey}`;

      fetch(url).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            // for (i = 0; i < data.list.length; i++) {
            var datefore = moment.unix(data.dt);
            var foretemp = data["main"]["temp"];
            var forehum = data["main"]["humidity"];

            some(datefore, foretemp, forehum);

            console.log(datefore);
            console.log(foretemp);
          });
        }
      });
    }
  });
}
// ------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------
// do local storage --

// GIVES ME UVI BUT I HAVE TO ENTER CITY LONGITUDE AND LATITUDE
// getApi();
// function getApi() {
//   navigator.geolocation.getCurrentPosition((success) => {
//     let { latitude, longitude } = success.coords;

//     fetch(
//       `https://api.openweathermap.org/data/2.5/onecall?lat=40.7648&lon=-73.9808&units=metrics&appid=ead377de503e1fdb3cf49c83815322d2`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);

//         var cityvalue = data["timezone"];
//         console.log(cityvalue);

//         var humidityEl = data["current"]["humidity"];
//         console.log(humidityEl);

//         var tempvalue = data["current"]["temp"];
//         console.log(tempvalue);

//         var windvalue = data["current"]["wind_speed"];
//         console.log(windvalue);

//         var uvvalue = data["current"]["uvi"];
//         console.log(uvvalue);

//         var Info = document.querySelector("#cityname");
//         var Temp = document.querySelector("#tempbox");
//         var Wind = document.querySelector("#windbox");
//         var humidity = document.querySelector("#humbox");
//         var UV = document.querySelector("#uvbox");

//         Info.innerHTML = cityvalue;
//         Temp.innerHTML = tempvalue;
//         Wind.innerHTML = windvalue;
//         humidity.innerHTML = humidityEl;
//         UV.innerHTML = uvvalue;
//       });
//   });
// }

// HAVE TO JUST CHANGE CITY NAME BUT NO UVI

// fetchButton.addEventListener("click", function () {
// fetch( "https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=ead377de503e1fdb3cf49c83815322d2")
//   .then(function (response) {
//     return response.json();
//   })
//   // .then(function (data) {

//   // })
//   .then((data) => {
//     console.log(data);

//     var cityvalue = data["name"];
//     console.log(cityvalue);
//     var humidityEl = data["main"]["humidity"];
//     console.log(humidityEl);
//     var tempvalue = data["main"]["temp"];
//     console.log(tempvalue);
//     var windvalue = data["wind"]["speed"];
//     console.log(windvalue);
//     var Info = document.querySelector("#cityname");
//     var Temp = document.querySelector("#tempbox");
//     var Wind = document.querySelector("#windbox");
//     var humidity = document.querySelector("#humbox");

//     Info.innerHTML = cityvalue;
//     Temp.innerHTML = tempvalue;
//     Wind.innerHTML = windvalue;
//     humidity.innerHTML = humidityEl;
//   });

// console.log(data);
// '+CityName.value+'
// figure out how toget date

// window.moment(timezone * 1000).format("HH:mm a")
//
