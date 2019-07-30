require("dotenv").config();

var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);

// variable for what we're going to do ie: "concert-this", "spotify-this-song", "movie-this", "do-what-it-says"
var searchTerm = process.argv[2];

// Here I am going handle the "concert-this" command
// I will need:  1. Name of venue, 2. venue location, 3. date of the event (using moment to format as "MM/DD/YYYY")

var movieName = process.argv[3];

if (searchTerm === "movie-this") {
    var axios = require("axios");
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
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
