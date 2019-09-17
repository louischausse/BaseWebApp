// MESSAGE APP

//Display posts on page load

$(document).ready(function(){
  getPosts();
})

// Google Sign-in
function handleSignin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user.email);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

// Save messages to the database
function addMessage(postTitle,postBody){
  var postData = {
    title: postTitle,
    message: postBody
  }

  var database = firebase.database().ref("posts");

  // Create a new post reference with an auto-generated id
  var newPostRef = database.push();
  newPostRef.set(postData, function(error) {
    if (error) {
      // The write failed...
      $(".error-message").text("An error occured.");
    } else {
      // Data saved successfully!
      window.location.reload();
    }
  });
}

// Handle data entry from the form
function handleMessageFormSubmit(){
  var postTitle = $("#post-title").val();
  var postBody = $("#post-body").val();
  addMessage(postTitle,postBody);
}

// Get posts data and display it on the page
function getPosts(){
  return firebase.database().ref("posts").once('value').then(function(snapshot) {
    var posts = snapshot.val();
    console.log(posts);

    for(var postKey in posts) {
      var post = posts[postKey];
      $("#post-listing").append("<div>"+post.title+" - "+post.message+"</div>")
    }
  });
}

//WEATHER APP

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
    $(".error-message").text("An error occured. Please enter a valid city name and make sure you didn't use any special characters.");
  }})
}

// Launch the get request with the search button
function searchWeather() {
  var searchQuery = $(".search").val();
  getWeather(searchQuery);
}