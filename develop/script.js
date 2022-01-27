//Variables..

var formEl = $("#city-form");
var CityName = $("#citynames");
var CityList = $("#searchedlist");
var SearchBtn = $("#SearchBtn");
var searchedlist = $("#searchedlist");
var apikey = "ead377de503e1fdb3cf49c83815322d2";
let Storage = localStorage.getItem("searchedlist")
  ? JSON.parse(localStorage.getItem("searchedlist"))
  : [];
console.log(Storage);

// ---------------------------------------------------------------------------------------

// SEARCH BOX, CITY LISTED AND BUTTON

var SearchBoxing = function (event) {
  event.preventDefault();

  // User inputs a city in the search box, which then does the PrintCities job...
  var NameInput = CityName.val();
  PrintCities(NameInput);
};

// Search buttons job:
SearchBtn.on("click", SearchBoxing);

// Cities to be printed in a list...
var PrintCities = function (name) {
  var listEl = $("<li>");
  var listDetail = name.concat("");
  listEl.addClass("list-group-item").text(listDetail);
  listEl.appendTo(CityList);
  console.log("button clicked");

  // Dont forget to 'store locally' when clicking this button...
  history();
};

// -----------------------------------------------------------------------------------

// LOCAL STORAGE

// Picks up the value of user input in search box...
function history() {
  Storage.push(CityName.value);
  localStorage.setItem("searchedlist", JSON.stringify(Storage));
  listBuilder(CityName.value);
  CityName.value = "";
}
// Create a list of last searched items with a delete button..
let listBuilder = (text) => {
  var cityEl = document.createElement("li");
  cityEl.innerHTML = text + ' <button onclick="deleteNote(this)">x</button>';
  searchedlist.append(cityEl);
};
// Save items even after refreshing through looping..
let getNotes = JSON.parse(localStorage.getItem("searchedlist"));
getNotes.forEach((cityEl) => {
  listBuilder(cityEl);
});

// Deleting the last searched via button..
let deleteNote = (btn) => {
  let btnEl = btn.parentNode;
  let index = [...btnEl.parentElement.children].indexOf(btnEl);
  Storage.splice(index, 1);
  localStorage.setItem("searchedlist", JSON.stringify(Storage));
  btnEl.remove();
};

// -----------------------------------------------------------------------------------

// Searched cities, turned into buttons that will take them to information they want...
$(document).on("click", "li", function () {
  var PickCity = $(this).text();
  Weather(PickCity);
});

// The below decide where each parameter will be printed..
function GrabInfo(para1, para2, para3, para4, para5, para6) {
  $("#cityname").text(para1);
  $("#todaysdate").text(para2);
  $("#tempbox").text(para3 + "C");
  $("#windbox").text("Wind : " + para4 + " MPH");
  $("#humbox").text("Humidity : " + para5 + " %");
  $("#iconbox").text(para6);
}

//Grabbing info from open weather API..
function Weather(para1) {
  var apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${para1}&units=metric&appid=${apikey}`;

  fetch(apiurl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        Display(para1);
        // Each parameter based on 'position' in url..
        var CityMain = data["name"];
        var Date = moment().format("MMMM Do YYYY");
        var Temp = data["main"]["temp"];
        var Wind = data["wind"]["speed"];
        var Humidity = data["main"]["humidity"];
        var icon = data.weather[0]["icon"];

        // Variables/parameters displayed as described in function Grabinfo
        GrabInfo(CityMain, Date, Temp, Wind, Humidity, icon);
        console.log(icon);
        console.log(CityMain);
        console.log(Date);
        console.log(data);
      });
    }

    // ------------------------------------------------------------------------------------------------------

    // 5 DAY FORECAST

    // The below decide where each parameter will be printed..
    function some(para1, para2, para3, para4, para5) {
      $(".forecast").text(para1 + para5);
      $(".datefore").text(para2);
      $(".tempforecast").text(para3 + "C");
      $(".humforecast").text("Hum : " + para4 + "%");
      $(".windforecast").text("Wind : " + para5 + " MPH");
    }

    //Grabbing info from open weather 5 Day forecast API..
    function Display(para1) {
      var url = `https://api.openweathermap.org/data/2.5/forecast?q=${para1}&units=metric&appid=${apikey}`;

      fetch(url).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            for (i = 0; i < 5; i++) {
              var Cityname = data["city"]["name"];
              var datefore = moment.unix(data.list[0].dt);
              var foretemp = data.list[0]["main"]["temp"];
              var forehum = data.list[0]["main"]["humidity"];
              var forewind = data.list[0]["wind"]["speed"];
              var icons = data.list[0].weather[0]["icon"];

              // Variables/parameters displayed as described in function Grabinfo
              some(Cityname, datefore, foretemp, forehum, forewind, icons);
              console.log(icons);
              console.log(data);
              console.log(datefore);
              console.log(foretemp);
              console.log(forehum);

              // ICON
              let weathicon = document.createElement("img");
              weathicon.setAttribute(
                "src",
                "https://openweathermap.org/img/wn/" +
                  data.list[0].weather[0]["icon"] +
                  "@2x.png"
              );
            }
          });
        }
      });
    }
  });
}

// USE UNITS METRCI TO CHANGE whole figure

// ["list"]["main"]["temp"];
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
