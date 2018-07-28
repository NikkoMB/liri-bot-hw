require("dotenv").config();
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request")
var keys = require("./keys");



var action = process.argv[2];
var parameter = process.argv.slice(3).join(" ");
// Labelling all my variables and important node stuff

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


function switchCase() {
  // Switch case statements used from Bank Exercise, uses statements to decalare action
  switch (action) {

    case 'my-tweets':
      grabTweets();                   // Statements to execute
      break;                          // Break causes code to jump to next set of instructions

    case 'spotify-this-song':
      grabSong();
      break;

    case 'movie-this':
      grabMovie();
      break;

    case 'do-what-it-says':
      grabReadme();
      break;

      default:                            // This is used for if there is a missing ' break ' in any of the statements 
      console.log("Something Broke");
      break;

  }
};

function grabTweets() {
  var params = { screen_name: "RowinnDinosaur" };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
      if (!error) {
          for (var i = 0; i < tweets.length; i++) {
              // Setting up the data in a variable so we can append it to te file later
              var dateCreated = tweets[i].created_at;
              var tweetText = JSON.stringify(tweets[i].text);
              var dataDisplayed = dateCreated + "\n" + tweetText + "\n";
              console.log("\n" + dataDisplayed);

              // Appending the entry to the log.txt file
          }
      }
  });
}

function grabMovie() {
  console.log("My Favorite movie is Starship Troopers!");

  
  // Testing if search term is included with: movie-this '<movie name here>'
  if (!parameter) {
    parameter = "Mr. Nobody";
  } 

  var queryUrl = "http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=40e9cece";

  // console.log(queryUrl);
  // Code used from OMDB Exercise done in class then added the extra output information
  request(queryUrl, function(err, res, body) {

    if (!err && res.statusCode === 200) {

      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value); // tomatoRating does not work but this does?
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
};

function grabSong() {
  console.log("Music!");
  // Spotify variable loading keys from keys.js
 
  // Same search terms like from twitter code, for use with: spotify-this-song '<song name here>'
  
  if (!parameter) {
    parameter = "All The Small Things";
  } 
  // Launching Spotify Search copied from "npmjs node-spotify-api" site
  spotify.search({
    type: 'track',
    query: parameter
  }, function(error, data) {
    if (error) {
      console.log('Error occurred: ' + error);
      return;
    } else {
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Preview: " + data.tracks.items[3].preview_url); // Needed to be changed to pull from 3rd spot in array
    }
  });
};

function grabReadme() {
  // Code & Comments for this section used from fs.readFile exercise
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    // Break the string down by comma separation and store the contents into the output array.
    var output = data.split().splice(",");
    // Loop Through the newly created output array
    for (var i = 0; i < output.length; i++) {
      // Print each element (item) of the array/
      console.log(output[i]);
    }
  });
}
switchCase();
// Was not sure if random.txt contents were supposed to cause spotify-this-song command to trigger, If so sorry :(