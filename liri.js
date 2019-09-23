require("dotenv").config();

var fs = require("fs");

var inquirer = require('inquirer');

var axios = require("axios");

var moment = require('moment');

var keys = require("./keys.js");
console.log(keys);

var spotify = new spotify(keys.spotify);

var omdb = new omdb(keys.omdb);

var bands = new BIT(keys.bandsintown);


// INQUIRER
inquirer.prompt([

    {
        type: "input",
        name: "name",
        message: "Hi, what's your name?"
    },

    {
        type: "list",
        name: "wouldYouLikeTo",
        message: "What would you like Liri to do?",
        choices: ["concert-this", "spotify-this", "movie-this", "do-what-it-says"]
    }

]).then(function (user) {

    // If the user chooses concert-this...
    if (user.wouldYouLikeTo === "concert-this") {

        console.log("==============================================");
        console.log("");
        
        console.log("");
        console.log("==============================================");
        concertThis(concertThis);
    }
    // If user chooses spotify-this...
    if (user.wouldYouLikeTo === "spotify-this") {

        console.log("==============================================");
        console.log("");
        
        console.log("");
        console.log("==============================================");
        spotifyThis(spotifyThis);
    }
    // If user chooses movie-this...
    if (user.wouldYouLikeTo === "movie-this") {

        console.log("==============================================");
        console.log("");
        
        console.log("");
        console.log("==============================================");
        movieThis(movieThis);
    } else {
        // If user doesn't enter a movie name...
        console.log("==============================================");
        console.log("");
        console.log("Sorry " + user.name);
        console.log("If you haven't watched 'Mr. Nobody,' then you should!");
        console.log("It's on Netflix!");
        console.log("");
        console.log("==============================================");
        movieThis("http://www.imdb.com/title/tt0485947/");
    }
    // If user chooses would-you-like-to
    if (user.wouldYouLikeTo === "do-what-it-says") {

        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            console.log(data);
            var dataArr = data.split(",");
            console.log(dataArr);
        });
        console.log("==============================================");
        console.log("");
        console.log("Well let's do it then, " + user.name);
        console.log("");
        console.log("==============================================");
    }
    spotifyThis(random.txt);
});




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

movieThis(movieThis);

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

spotifyThis(spotifyThis);


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

concertThis(concertThis);


// BONUS OUTPUTTING THE DATA BY APPENDING EACH COMMAND

fs.readFile("log.txt", "utf8", function (err, data) {
    // If there's an error reading the file, we log it and return immediately
    if (err) {
        return console.log(err);
    }

    // Inside of the readFile callback, we use the appendFile function
    // The first parameter is the name of the text file to save to
    // The second parameter is the data we want to write as a string
    // The third parameter is the callback function to be called when appendFile is finished
    // For more info, see the docs: https://nodejs.org/api/fs.html#fs_fs_appendfile_path_data_options_callback
    fs.appendFile("log.txt", "command", function (err) {
        // If there was an error, we log it and return immediately
        if (err) {
            return console.log(err);
        }

        // log that we saved the info successfully. we know that
        // because no error was encountered, or we would have returned above
        console.log("SAVED");

    });
});