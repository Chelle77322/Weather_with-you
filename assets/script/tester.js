$(document).ready(function () {
    $(".searchBtn").click(function (event) {
      var cityName = $("#cityInput").val().trim();
      event.preventDefault();
      queryURL =
        "api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=2b07c349d7b932546c42e60806d40881";
      console.log(queryURL)
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response)
        })
    });
  });