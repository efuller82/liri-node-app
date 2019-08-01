// Next 3 lines are to get spotify keys from keys.js and .env
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// variable for what we're going to do ie: "concert-this", "spotify-this-song", "movie-this", "do-what-it-says"
var searchMethod = process.argv[2];
// variable for artist or movie 
var searchTerm = process.argv[3];

// next two lines are to clean up the look of the log.txt file
var newLine = "\r\n";
var topBottomBar = "_________________________________________________";

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
            // stored in variables so info can be easily used to append to log
            var artist = response.tracks.items[0].artists[0]["name"];
            var song = response.tracks.items[0].name;
            var songUrl = response.tracks.items[0].album.artists[0].external_urls.spotify;
            var album = response.tracks.items[0].album.name;
            console.log("_____________________________________");
            console.log("Artist: " + artist);
            console.log("Song: " + song);
            console.log("Listen to the song: " + songUrl);
            console.log("Album: " + album);
            console.log("_____________________________________");
            // using fs to append results to log.txt
            var fs = require('fs');
            fs.appendFile('log.txt', topBottomBar + newLine + artist + newLine + song + newLine + songUrl + newLine + album + newLine + topBottomBar + newLine, function (err) {
                if (err) throw err;
            })

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
            var movieTitle = response.data.Title;
            var movieYear = response.data.Year;
            var imdbRating = response.data.Ratings[0].Value;
            var tomatoeRating = response.data.Ratings[1].Value;
            var movieCountry = response.data.Country;
            var movieLanguage = response.data.Language;
            var moviePlot = response.data.Plot;
            var movieStars = response.data.Actors;
            console.log("________________________________________");
            console.log("Title: " + movieTitle);
            console.log("Year: " + movieYear);
            console.log("IMDB Rating: " + imdbRating);
            console.log("Rotten Tomatoes: " + tomatoeRating);
            console.log("Country: " + movieCountry);
            console.log("Language: " + movieLanguage);
            console.log("Plot: " + moviePlot);
            console.log("Starring: " + movieStars);
            console.log("________________________________________");
            // appending to log.txt
            var fs = require('fs')
            fs.appendFile('log.txt', topBottomBar + newLine + movieTitle + newLine + movieYear + newLine + imdbRating + newLine + tomatoeRating + newLine + movieCountry + newLine + movieLanguage + newLine + moviePlot + newLine + movieStars + newLine + topBottomBar + newLine, function (err) {
                if (err) throw err;
            })
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
            //variables for the data
            var venue = response.data[0].venue.name;
            var city = response.data[0].venue.city;
            var date = moment(response.data[0].datetime).format('MM/DD/YYYY');
            console.log("_____________________________________________");
            console.log("Venue name: " + venue);
            console.log("City: " + city);
            console.log("Date: " + date);
            console.log("_____________________________________________");
            //logging data to log.txt
            var fs = require('fs')
            fs.appendFile('log.txt', topBottomBar + newLine + venue + newLine + city + newLine + date + newLine + topBottomBar + newLine, function (err) {
                if (err) throw err;
            })

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