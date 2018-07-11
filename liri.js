var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request")
var keys = require("./keys");

var action = process.argv[2];
var parameter = process.argv[3];
// Labelling all my variables and important node stuff

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
  console.log("Latest Tweets!");
  // New variable for Twitter to load keys from keys.js
  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

  var params = {
    screen_name: "RowinnDinosaur"
  };
  // Twitter parameters default tweet count of 20, but I only posted 3 tweets
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    // Calling the get method and returning the Data
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        var returnedData = ('Number: ' + (i + 1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
        console.log(returnedData);
      }
    }
  });
};

function grabMovie() {
  console.log("My Favorite movie is Starship Troopers!");

  var findMovie;
  // Testing if search term is included with: movie-this '<movie name here>'
  if (parameter === undefined) {
    findMovie = "Mr. Nobody";
  } else {
    findMovie = parameter;
  };

  var queryUrl = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=40e9cece";

  console.log(queryUrl);
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
  var spotify = new Spotify({
    id: keys.spotifyKeys.client_ID,
    secret: keys.spotifyKeys.client_secret
  });
  // Same search terms like from twitter code, for use with: spotify-this-song '<song name here>'
  var searchTrack;
  if (parameter === undefined) {
    searchTrack = "All The Small Things";
  } else {
    searchTrack = parameter;
  }
  // Launching Spotify Search copied from "npmjs node-spotify-api" site
  spotify.search({
    type: 'track',
    query: searchTrack
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
