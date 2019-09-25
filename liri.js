require("dotenv").config();

var fs = require("fs");

// var inquirer = require('inquirer');

var axios = require('axios');

var moment = require('moment');

var keys = require("./keys.js");
console.log(keys);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var omdb = require('omdb-client');
// var omdb = new omdb(keys.ombd);

var bands = require('bandsintown');
// var bands = new Bands(keys.bandsintown);


var inputString = process.argv;

var userChoice = inputString[2];
var userInput = inputString[3];

switch (userChoice) {
    case "movie-this":
        movieThis(userInput);
        break;

    case "spotify-this":
        spotifyThis(userInput);
        break;

    case "concert-this":
        concertThis(userInput);
        break;

    case "would-you-like-to":
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            console.log(data);
            var dataArr = data.split(",");
            console.log(dataArr);
        });
        spotifyThis(random.txt);
        break;
}

function concertThis() {

    var bandName = userInput;

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

function spotifyThis() {

    var songName = userInput;

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

function movieThis() {
    // Create an empty variable for holding the movie name
    var movieName = userInput;

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    // for (var i = 3; i < userInput.length; i++) {

    //     if (i > 3 && i < userInput.length) {
    //         movieName = movieName + "+" + userInput[i];
    //     } else {
    //         movieName += userInput[i];

    //     }
    // }

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











// Inside of the readFile callback, we use the appendFile function
// The first parameter is the name of the text file to save to
// The second parameter is the data we want to write as a string
// The third parameter is the callback function to be called when appendFile is finished
// For more info, see the docs: https://nodejs.org/api/fs.html#fs_fs_appendfile_path_data_options_callback
fs.appendFile("log.txt", "", function (err) {
    // If there was an error, we log it and return immediately
    if (err) {
        return console.log(err);
    }

    // log that we saved the info successfully. we know that
    // because no error was encountered, or we would have returned above
    console.log("SAVED");

});
