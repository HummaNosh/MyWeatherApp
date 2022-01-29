//Variables..
// Todays date
var today = moment().format("MMMM Do YYYY, h:mm:ss a");
$("#today").text(today);
var formEl = $("#city-form");
var CityName = $("#citynames");
var CityList = $("#searchedlist");
var SearchBtn = $("#SearchBtn");
var apikey = "ead377de503e1fdb3cf49c83815322d2";
var iconsection = $(".iconfore");
var Storage = localStorage.getItem("searchedlist")
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
  CityList.append(cityEl);
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
  $("#tempbox").text(para3 + "°");
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
        var Temp = `${Math.floor(data["main"]["temp"])}`;
        var Wind = data["wind"]["speed"];
        var Humidity = data["main"]["humidity"];

        // Variables/parameters displayed as described in function Grabinfo
        GrabInfo(CityMain, Date, Temp, Wind, Humidity);

        // ICON Link and image
        let Iconlink = document.createElement("img");
        Iconlink.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        );
        iconbox.append(Iconlink);

        // ---------------------------------------------------------------------------------------------------
        // Below is for UV function
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        UVJOB(lat, lon);
      });
    }

    // ------------------------------------------------------------------------------------------------------

    // 5 DAY FORECAST

    // The below decide where each parameter will be printed..
    function forecasting(para1, para2, para3, para4, para5) {
      $(".forecast").text(para1);
      $(".datefore").text(para2);
      $(".tempforecast").text("Temp : " + para3 + "°C");
      $(".humforecast").text("Hum : " + para4 + "%");
      $(".windforecast").text("Wind : " + para5 + " mph");
    }

    //Grabbing info from open weather 5 Day forecast API..
    function Display(para1) {
      var url = `https://api.openweathermap.org/data/2.5/forecast?q=${para1}&units=metric&appid=${apikey}`;

      fetch(url).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data.list);

            // ICON
            let Iconlink2 = document.createElement("img");
            Iconlink2.setAttribute(
              "src",
              `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`
            );
            iconsection.append(Iconlink2);

            // -------------------------------------------------------------------------------------------
            //  Give me data for 5 days...
            for (i = 0; i < data.list.length; i++) {
              var Cityname = data["city"]["name"];
              var datefore = moment.unix(data.list[0].dt);
              var foretemp = `${Math.floor(data.list[0]["main"]["temp"])}`;
              var forehum = data.list[0]["main"]["humidity"];
              var forewind = data.list[0]["wind"]["speed"];

              // Variables/parameters displayed as described in function Grabinfo
              forecasting(Cityname, datefore, foretemp, forehum, forewind);

              console.log(data);
              console.log(datefore);
            }
          });
        }
      });
    }
  });
}

// Pull UVI

// Paint UV in UV box
function UVpaste(UVi) {
  $("#uvbox").text("UV Index: " + UVi + " Currently");
}

// Pull lat and lon from above variables..and give me the UV index
function UVJOB(lon, lat) {
  var uvurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alert&appid=dbb45a93ce752788381a20675a5a9c02`;

  fetch(uvurl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var UVi = data.current.uvi;
        UVpaste(UVi);
      });
    }
  });
}
