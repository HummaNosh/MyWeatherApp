var formEl = $("#city-form");
var CityName = $("#citynames");
var CityList = $("#searchedlist");
var searchbtn = $("#SearchBtn");
var fetchButton = document.getElementById("#fetch");

// ---------------------------------------------------------------------------------------
var handleFormSubmit = function (event) {
  event.preventDefault();

  var nameInput = CityName.val();
  PrintCities(nameInput);
};

formEl.on("submit", handleFormSubmit);

// Cities go in list form
var PrintCities = function (name) {
  var listEl = $("<li>");
  var listDetail = name.concat(" ");
  listEl.addClass("list-group-item").text(listDetail);
  listEl.appendTo(CityList);
};

// ------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------
// do local storage --

// GIVES ME UVI BUT I HAVE TO ENTER CITY LONGITUDE AND LATITUDE
getApi();
function getApi() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=40.7648&lon=-73.9808&units=metrics&appid=ead377de503e1fdb3cf49c83815322d2`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        var cityvalue = data["timezone"];
        console.log(cityvalue);

        var humidityEl = data["current"]["humidity"];
        console.log(humidityEl);

        var tempvalue = data["current"]["temp"];
        console.log(tempvalue);

        var windvalue = data["current"]["wind_speed"];
        console.log(windvalue);

        var uvvalue = data["current"]["uvi"];
        console.log(uvvalue);

        var Info = document.querySelector("#cityname");
        var Temp = document.querySelector("#tempbox");
        var Wind = document.querySelector("#windbox");
        var humidity = document.querySelector("#humbox");
        var UV = document.querySelector("#uvbox");

        Info.innerHTML = cityvalue;
        Temp.innerHTML = tempvalue;
        Wind.innerHTML = windvalue;
        humidity.innerHTML = humidityEl;
        UV.innerHTML = uvvalue;
      });
  });
}

// DO I HAVE TO LINK PER FETCH PER CITY

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
