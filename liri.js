require("dotenv").config();
var fs = require("fs");
// var inquirer = require('inquirer');
var axios = require('axios');
var moment = require('moment');

var keys = require("./keys.js");
console.log(keys);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var omdb = keys.omdb.id;
var bands = keys.bandsintown.id;



var inputString = process.argv;

var userChoice = inputString[2];
var userInput = inputString.slice(3).join(" ");

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

    var preview = "https://api.spotify.com/v1/tracks/"

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    spotify.search({ type: 'track', query: userInput, limit: 1}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log('data!', data.tracks.items[0]);
        // console.log('data!!!', JSON.stringify(data));
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0] + preview + songName);
        console.log("Album: " + data.tracks.items[0].album.name);
    });
    if (!userInput) {
        console.log('no user input')
        var queryUrl = "https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE";
        spotify.search({
            type: 'track', query: queryUrl + spotify}, function (err, data) {
            if(err) {
                return console.log('Error occurred: ' + err);
            }
        });
    };
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

            var respo = response.data;
            console.log("Title: " + respo.Title);
            console.log("Release Year: " + respo.Year);
            console.log("IMDb Rating: " + respo.imdbRating);
            console.log("Rotten Tomatoes Rating: " + respo.ratings[0]);
            console.log("Produced in: " + respo.Country);
            console.log("Language: " + resp.Language);
            console.log("Plot: " + respo.Plot);
            console.log("Actors " + respo.Actors.join(", "));
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
