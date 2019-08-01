// Next 3 lines are to get spotify keys from keys.js and .env
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


// variable for what we're going to do ie: "concert-this", "spotify-this-song", "movie-this", "do-what-it-says"
var searchMethod = process.argv[2];
// variable for artist or movie 
var searchTerm = process.argv[3];

// conditional for empty/null song search; these lines have to be here because they set the
// variables before the function is run
if ((searchMethod === "spotify-this-song") && (searchTerm == null)) {
    searchTerm = "The Sign Ace of Base";
}
// conditional for empty/null movie search)
if ((searchMethod === "movie-this") && (searchTerm == null)) {
    searchTerm = "Mr. Nobody";
}

// function for spotify-this-song
function spotifyThisSong() {
    spotify
        .search({ type: 'track', query: searchTerm })
        .then(function (response) {
            console.log("_____________________________________");
            console.log("Artist: " + response.tracks.items[0].artists[0]["name"]);
            console.log("Song: " + response.tracks.items[0].name);
            console.log("Listen to the song: " + response.tracks.items[0].album.artists[0].external_urls.spotify);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log("_____________________________________");
        })
        .catch(function (err) {
            console.log(err);
        });
}

//function for movie-this
function movieThis() {
    var axios = require("axios");
    axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("________________________________________");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Starring: " + response.data.Actors);
            console.log("________________________________________");
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

//function for concert-this
function concertThis() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
    var axios = require("axios");
    var moment = require("moment");
    axios
        .get(queryUrl)
        .then(function (response) {
            console.log("_____________________________________________");
            console.log("Venue name: " + response.data[0].venue.name);
            console.log("City: " + response.data[0].venue.city);
            console.log("Date: " + moment(response.data[0].datetime).format('MM/DD/YYYY'));
            console.log("_____________________________________________");
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

// function for do-what-it-says
function doWhatItSays() {
    var fs = require('fs');
    // here we're going to read from the random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // split the data and make it an array
        var dataArr = data.split(',');
        console.log(dataArr);
        searchMethod = dataArr[0];
        searchTerm = dataArr[1];
        if (searchMethod === "concert-this") {
            concertThis();
        }
        if (searchMethod === "spotify-this-song") {
            spotifyThisSong();
        }
        if (searchMethod === "movie-this") {
            movieThis();
        }
    })
}
// Bands in town 
if (searchMethod === "concert-this") {
    concertThis();
}
// Conditional for movie search
if (searchMethod === "movie-this") {
    movieThis();
}
// Conditional for Spotify query
if (searchMethod === "spotify-this-song") {
    spotifyThisSong();
}
//conditional for do-what-it-says
if (searchMethod === "do-what-it-says") {
    doWhatItSays();
}