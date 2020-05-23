// global variables
var cities = [];
var currentCity = "";
var apiKey = "6ec0b89616ce4c21ba3174214202305";

// ajax request
function getWeather(city) {
  var queryUrl = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=5`;

  $.getJSON(queryUrl, function (json) {
    var date = new Date(json.location.localtime).toDateString();
    var cityName = json.location.name;
    var iconUrl = "https:" + json.forecast.forecastday[0].day.condition.icon;
    var uv = json.current.uv;
  });
}
