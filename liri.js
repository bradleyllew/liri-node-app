require("dotenv").config();

var fs = require("fs");

var axios = require("axios");

var moment = require('moment');

var keys = require("./keys.js");

console.log(keys);

var spotify = new Spotify(keys.spotify);

var omdb = new Omdb(keys.omdb);

var bands = new BIT(keys.bandsintown);


// OMDB:
function movieThis() {

    // Store all of the arguments in an array
    var movieThis = process.argv[2];
    var nodeArgs = process.argv[3];

    // Create an empty variable for holding the movie name
    var movieName = "";

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];

        }
    }

    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = omdb + movieName;

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl)
        .then(function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDb Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.imdbVotes);
            console.log("Produced in: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors " + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

movieThis();

// SPOTIFY
function spotifyThis() {

    // Store all of the arguments in an array
    var spotifyThis = process.argv[2];
    var nodeArgs = process.argv[3];

    // Create an empty variable for holding the movie name
    var songName = "";

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            songName = songName + "+" + nodeArgs[i];
        } else {
            songName += nodeArgs[i];

        }
    }

    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = spotify + songName;

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl)
        .then(function (response) {
            console.log("Artist: " + response.data.artist);
            console.log("Song Name: " + response.data.name);
            console.log("Preview Link: " + response.data.preview_url);
            console.log("Album: " + response.data.album);
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

spotifyThis();


// BANDS IN TOWN
function concertThis() {

    // Store all of the arguments in an array
    var concertThis = process.argv[2];
    var nodeArgs = process.argv[3];

    // Create an empty variable for holding the movie name
    var bandName = "";

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            bandName = bandName + "+" + nodeArgs[i];
        } else {
            bandName += nodeArgs[i];

        }
    }

    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = bands + bandName;

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl)
        .then(function (response) {
            console.log("Venue: " + response.data.VenueData.name);
            console.log("Location: " + response.data.city);
            console.log("Date of Concert: " + moment(response.data.datetime).format('L'));
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

concertThis();


// BONUS OUTPUTTING THE DATA BY APPENDING EACH COMMAND

fs.readFile("log.txt", "utf8", function(err, data) {
  // If there's an error reading the file, we log it and return immediately
  if (err) {
    return console.log(err);
  }

  // Inside of the readFile callback, we use the appendFile function
  // The first parameter is the name of the text file to save to
  // The second parameter is the data we want to write as a string
  // The third parameter is the callback function to be called when appendFile is finished
  // For more info, see the docs: https://nodejs.org/api/fs.html#fs_fs_appendfile_path_data_options_callback
  fs.appendFile("log.txt", "command", function(err) {
    // If there was an error, we log it and return immediately
    if (err) {
      return console.log(err);
    }

    // log that we saved the info successfully. we know that
    // because no error was encountered, or we would have returned above
    console.log("SAVED");

  });
});