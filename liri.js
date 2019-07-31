// Next 3 lines are to get spotify keys from keys.js and .env
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


// variable for what we're going to do ie: "concert-this", "spotify-this-song", "movie-this", "do-what-it-says"
var searchMethod = process.argv[2];
// variable for artist or movie 
var searchTerm = process.argv[3];

// Conditional for Spotify query
if (searchMethod === "spotify-this-song") {
    spotify
        .search({ type: 'track', query: searchTerm })
        .then(function (response) {
            console.log("Artist: " + response.tracks.items[0].artists[0]["name"]);
            console.log("Song: " + response.tracks.items[0].name);
            console.log("Listen to the song: " + response.tracks.items[0].album.artists[0].external_urls.spotify);
            console.log("Album: " + response.tracks.items[0].album.name);
        })
        .catch(function (err) {
            console.log(err);
        });
}

// Conditional for movie search
if (searchMethod === "movie-this") {
    var axios = require("axios");
    axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.Ratings[0]);
            console.log(response.data.Ratings[1]);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
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

// Bands in town 
if (searchMethod === "concert-this") {
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
    var axios = require("axios");
    var moment = require("moment");
    axios
        .get(queryUrl)
        .then(function (response) {
            console.log("Venue name: " + response.data[0].venue.name);
            console.log("City: " + response.data[0].venue.city);
            console.log("Date: " + moment(response.data[0].datetime).format('MM/DD/YYYY'));

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