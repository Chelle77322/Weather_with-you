$(document).ready(function(){
//Declaring variables to be used
const apiKey = "&appid=d0b7be971023771643958546fb4a9079";
const alternAPI = "&appid=804efd95195790cfac921c2a61aed882";
const celsius =  "&units=metric";
var weatherHistory = [];
inputData = "";
//Very First Function
//this happens first
$("#formCity").on("submit", function (e) {
  e.preventDefault();
  var cityInput= $("#cityInput.form-control").val().trim();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput  +celsius + apiKey;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    success: function(data){
      inputData = data;
        icon = data.weather[0].icon;
        console.log(icon);
        var URL = "http://openweathermap.org/img/w/"+ icon + ".png";
        console.log(URL);
        var currentDay = moment().format("DD/MM/YY");
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var windspeed = data.wind.speed;
        console.log(windspeed);
  
  //Make the changes reflect on the webpage
  $(".currentCity").html(`${data.name} ${currentDay}`);
        $("#weatherIcon").attr("src",URL);
        $("#weatherIcon").attr("alt", "weather icon");
        $(".temp").html("Temp: " + temp + "&deg");
        $(".humidity").html("Humidity: " + humidity + "%");
        $(".windspeed").html("Wind Speed: " + windspeed + "km");
 //Pushing the search to the weatherHistory array       
        weatherHistory.push(data.name);
  //Calling the other functions UVIndex, Seven Day Forecast appendweatherHistory
  getUVIndex();
  getSevenDayForecast();
  appendweatherHistory();
  //Resetting the input to blank
  $("#cityInput.form-control").val("");
    }
  });
});

//This function loads the last city searched for
function lastCity(){
  if (localStorage.getItem("citykey_0")!= null){
    var cityIndex = localStorage.length - 1;
    var cityValues = localStorage.getItem("citykey_" + cityIndex);
    var cityInput = values.replace(/"/g,"");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityValues +celsius + apiKey;

    $.ajax({
      url: queryURL,
      success: function showResults(data){
        inputData = data;
        icon = data.weather[0].icon;
        console.log(icon);
        var URL = "http://openweathermap.org/img/w/" + icon + ".png";
        var currentDay = moment().format("DD/MM/YY");
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var windspeed = data.wind.speed;
  //Make the changes reflect on the webpage
  $(".currentCity").html(`${data.name} ${currentDay}`);
        $("#weatherIcon").attr("src",URL);
        $("#weatherIcon").attr("alt", "weather icon");
        $(".temp").html("Temp: " + temp + "&deg");
        $(".humidity").html("Humidity: " + humidity + "%");
        $(".windspeed").html("Wind Speed: " + windspeed + "km");
//Calling other functions for UVIndex and the 7 day forecast
        getUVIndex();
        getSevenDayForecast();
}
});
}  
}

lastCity();
//Function to get UVIndex based on location of city and return the url. Called const apiKey
function getUVIndex(){
  var lat = inputData.coord.lat;
  console.log(lat);
  var lon = inputData.coord.lon;
  console.log(lon);
  var urlUVindex = " https://api.openweathermap.org/data/2.5/uvi?"+"&lat=" + lat +"&lon=" + lon +apiKey;
  console.log(urlUVindex);

//Commence ajax to retrieve the UV information
$.ajax({
url: urlUVindex,
success:function(data){
var uvIndex = data.value;
console.log(uvIndex);
$(".UVIndex").html("UV Index:"  +uvIndex);
//Condition check within the function to display UV warnings
if (uvIndex >=8){
  $(".UVIndex").attr("class", "high");
}
else if (uvIndex <6){
  $(".UVIndex").attr("class", "moderate");
}
else{
$(".UVIndex").attr("class", "low");
}
}
});
}
//Function to get the seven day forecast for the city searched
function getSevenDayForecast(){
var city = inputData.name;
var URLforecast ="https://api.openweathermap.org/data/2.5/forecast?q=" + city +celsius + apiKey;
console.log(URLforecast);

//Retrieving data from website using ajax
$.ajax({
url: URLforecast,

success: function(data){
var listForecast = data.list;
//for loop to loop through number of days starting with the value of current day and display it to the corresponding forecast card
for (i = 0; i < 8; i ++){
var forIcon = listForecast[i].weather[0].icon;
console.log(forIcon);
var weatherURL = "http://openweathermap.org/img/w/" + forIcon + ".png";
$("#weatherIcon").attr("src" + weatherURL);
var forecastDay = moment().add(i, 'days');
console.log(forecastDay);
var predictedTemp = listForecast[i].main.temp;
var forecastDayFormat = moment(forecastDay).format("DD/MM/YY");
var predictedHumidity = listForecast[i].main.humidity;
//Conditions to load the correct information into each of the cards
if (i == 1) {
$(".forecast_day1").html(forecastDayFormat);
$(".forecast1-img").attr("src", weatherURL);
$(".forecast1-img").attr("alt", "weather icon");
$(".forecast_temp1").html("Temp " + predictedTemp + "&deg");
$(".forecast_humidity1").html("Humidity: " + predictedHumidity + "%");
}
else if (i == 2) {
$(".forecast_day2").html(forecastDayFormat);
$(".forecast2-img").attr("src", weatherURL);
$(".forecast2-img").attr("alt", "weather icon");
$(".forecast_temp2").html("Temp: " + predictedTemp + "&deg");
$(".forecast_humidity2").html("Humidity: " + predictedHumidity + "%");
}
else if (i == 3) {
$(".forecast_day3").html(forecastDayFormat);
$(".forecast3-img").attr("src", weatherURL);
$(".forecast3-img").attr("alt", "weather icon");
$(".forecast_temp3").html("Temp: " + predictedTemp + "&deg");
$(".forecast_humidity3").html("Humidity: " + predictedHumidity + "%");
}
else if (i == 4) {
$(".forecast_day4").html(forecastDayFormat);
$(".forecast4-img").attr("src", weatherURL);
$(".forecast4-img").attr("alt", "weather icon");
$(".forecast_temp4").html("Temp: " + predictedTemp + "&deg");
$(".forecast_humidity4").html("Humidity: " + predictedHumidity + "%");
}
else if (i == 5) {
$(".forecast_day5").html(forecastDayFormat);
$(".forecast5-img").attr("src", weatherURL);
$(".forecast5-img").attr("alt", "weather icon");
$(".forecast_temp5").html("Temp: " + predictedTemp + "&deg");
$(".forecast_humidity5").html("Humidity: " + predictedHumidity + "%");
}
else if (i == 6) {
$(".forecast_day6").html(forecastDayFormat);
$(".forecast6-img").attr("src", weatherURL);
$(".forecast6-img").attr("alt", "weather icon");
$(".forecast_temp6").html("Temp: " + predictedTemp + "&deg");
$(".forecast_humidity6").html("Humidity: " + predictedHumidity + "%");
}
else if (i == 7) {
$(".forecast_day7").html(forecastDayFormat);
$(".forecast7-img").attr("src", weatherURL);
$(".forecast7-img").attr("alt", "weather icon");
$(".forecast_temp7").html("Temp: " + predictedTemp + "&deg");
$(".forecast_humidity7").html("Humidity: " + predictedHumidity + "%");
}
}
}
});
}
//Function to save search into it's own history array
function appendweatherHistory(){
  var listGroup = $(".history");
  var cityKeys = Object.keys(localStorage);
  console.log("city index store " + cityKeys.length);
  console.log(weatherHistory);

  localStorage.setItem(
    "citykey_" + cityKeys.length,
    JSON.stringify(weatherHistory[weatherHistory.length -1])
  );

}
//Function for localStorage
function Storage(){
  var listGroup = $(".history");
  if(localStorage.getItem("citykey_0")!= null){
  
    for (i=0; i < localStorage.length; i ++){
      var Store = localStorage.getItem("citykey_" +i);
      Store = Store.replace(/"/g, "");

    }
  }
  }
  Storage();
//Event Trigger Function Search
$('#searchBtn').click (function(e){
  e.preventDefault();
  var cityInput= $("#cityInput.form-control").val().trim();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput +celsius + apiKey;
  $.ajax({
    url: queryURL,
    success: function(data){
      inputData = data;
        icon = data.weather[0].icon;
        console.log(icon);
        var URL = "http://openweathermap.org/img/w/" + icon + ".png";
        var currentDay = moment().format("DD/MM/YY");
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var windspeed = data.wind.speed;
  
  //Make the changes reflect on the webpage
  $(".currentCity").html(`${data.name} ${currentDay}`);
        $("#weatherIcon").attr("src",URL);
        $("#weatherIcon").attr("alt", "weather icon");
        $(".temp").html("Temp:" + temp + "&deg");
        $(".humidity").html("Humidity: " + humidity + "%");
        $(".windspeed").html("Wind Speed: " + windspeed + "km");
 //Pushing the search to the weatherHistory array       
        weatherHistory.push(data.name);
  //Calling the other functions UVIndex, Seven Day Forecast appendweatherHistory
  getUVIndex();
  getSevenDayForecast();
  appendweatherHistory();
  //Resetting the input to blank
  $("#cityInput.form-control").val("");
    }
  });
});

//Event Trigger Historic Search
$('historyBtn').click(".appendweatherHistory", function (){
  var cityInput = $(this).html();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="  + cityInput +celsius + apiKey;
  $.ajax({
    url: queryURL,
    success: function(data){
      inputData = data;
        icon = data.weather[0].icon;
        console.log(icon);
        var URL = "http://openweathermap.org/img/w/" + icon + ".png";
        var currentDay = moment().format("DD/MM/YY");
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var windspeed = data.wind.speed;
  //Make the changes reflect on the webpage
  $(".currentCity").text(`${data.name} ${currentDay}`);
        $("#weatherIcon").attr("src",URL);
        $("#weatherIcon").attr("alt", "weather icon");
        $(".temp").text("Temp: " + temp + "&deg");
        $(".humidity").text("Humidity: " + humidity + "%");
        $(".windspeed").text("Wind Speed: " + windspeed + "km");
 //Pushing the search to the weatherHistory array       
       // weatherHistory.push(data.name);
  //Calling the other functions UVIndex, Seven Day Forecast appendweatherHistory
  getUVIndex();
  getSevenDayForecast();
}
});
});
});


