$(document).ready(function(){
//Event Trigger to start the code
$('#searchBtn').click(function(e){
    e.preventDefault();
    const apiKey = "&appid=d0b7be971023771643958546fb4a9079";
    const alternAPI = "&appid=804efd95195790cfac921c2a61aed882";
    var city = $("#city_container").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
  //Condition to check if city value is blank  
if(city!= ''){
//Start of the ajax
  $.ajax({
    url: queryURL,
    success: function showResults(data){
      alert("The Weather"+ data.name + data.main.temp);
       
    }

  });
  
}
else
{
    alert("You need to enter a city");
}
    

});





});

