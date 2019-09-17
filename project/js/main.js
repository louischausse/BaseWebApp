// Get the weather on page load. Require a defined city in the Request URL. Comment out this section if you want an input field to select the city.
/*$(document).ready(function(){
  getWeather();
})*/


// Get the weather on from a search input field. Comment out this section if you don't want an input field to select the city.
function getWeather(searchQuery) {

  // The https request to the API
  var url = "https://api.openweathermap.org/data/2.5/weather?q=+"+searchQuery+"&units=imperial&APPID="+apiKey;

  // Make sure the values are cleared before each new search
  $(".city").text("");
  $(".temp").text("");
  $(".error-message").text("");

  // Display API response to the html page
  $.ajax(url,{success: function(data){
    console.log(data);
    $(".city").text(data.name);
    $(".temp").text(data.main.temp);
  }, error: function(error){
    $(".error-message").text("An error occured. Please enter a valid city name and make sure you didn't use any special characters");
  }})
}

// Launch the get request with the search button
function searchWeather() {
  var searchQuery = $(".search").val();
  getWeather(searchQuery);
}