// global variables
var cities = [];
var currentCity = "";
var apiKey = "6ec0b89616ce4c21ba3174214202305";

// ajax request
function getWeather(city) {
  var queryUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;

  $.getJSON(queryUrl, function (json) {
    var date = new Date(json.location.localtime).toDateString();
    var cityName = json.location.name;
    var iconUrl = "https:" + json.forecast.forecastday[0].day.condition.icon;
    var uv = json.current.uv;

    $("#currentCity").html(`${cityName} : ${date}  <img src="${iconUrl}">`);
    $("#temp").text(" " + json.current.temp_f + " °F");
    $("#humidity").text(" " + json.current.humidity + " %");
    $("#wind").text(" " + json.current.wind_mph + " MPH");
    $("#uvIndex").text("  " + uv);

    var forecast = json.forecast.forecastday;

    for (var i = 0; i < 5; i++) {
      var data = json.forecast.forecastday[i % forecast.length];
      var dateForecast = data.date;
      var tempForecast = data.day.maxtemp_f;
      var humidityForecast = data.day.avghumidity;
      var conditionIcon = data.day.condition.icon;

      $("#days").append(`
    <div class="card col-2 py-2 mr-1 bg-primary text-white">
      <span class="card-title">${dateForecast}</span>
           <img src="https:${conditionIcon}" width=64>
          <span>Temp: ${tempForecast} F</span>
      <span>Humidity: ${humidityForecast} %</span>
    </div>`);
    }
  });
}
function getCities() {
  $("#cities-prepend").empty();

  cities.forEach((city) => {
    var activeClass = "bg-light";
    if (city === currentCity) activeClass = "bg-active";
    $("#cities-prepend").prepend(
      `<li class="list-group-item d-flex justify-content-between ${activeClass}" onclick="setActiveCity('${city}')">${city}
			</li>`
    );
  });
  if (currentCity) getWeather(currentCity);
}

function setCurrentCity(city) {
  currentCity = city;
  localStorage.setItem("currentCity", currentCity);
  getCities();
}
function addCity() {
  var city = $("#search-text").val();

  if (!cities.includes(city)) {
    cities.push(city);

    localStorage.setItem("cities", JSON.stringify(cities));
  }

  setCurrentCity(city);
}

$(document).ready(function () {
  $("#search-button").on("click", addCity);
});
