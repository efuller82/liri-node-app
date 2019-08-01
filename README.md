# liri-node-app

This project uses to node to take in parameters on the command line and return to the user information regarding songs, artists' concerts, and movies. 

1. concert-this
    -This provides information, using bandsintown API, about artists' upcoming show.
    -From the command line, enter:
        node liri.js concert-this "here is where the user types in the artist's name"  ### press enter ###
    -The user will then see information about the artist's next concert in the console as well as logged into a text file named log.txt.
    -Not all artists have their information on this site.  In this case, the user will see a message saying so in the console, and nothing will be logged to log.txt.

2.  movie-this
    -This uses the OMDB API to show information about movies.
    -From the command line, enter:
        node liri.js movie-this "here is where the user types in the name of the movie" ### press enter ###
    -The user will then see the movie information in the console as well as on the log.txt file. 
    -If the movie search is left blank, the user will get information about the classic title "Mr. Nobody".

3. spotify-this-song
    -This uses Spotify's API to show information about a song the user searches. 
    -From the command line, enter: 
        node liri.js spotify-this-song "here is where the user types the name of the song" ### press enter ###
    -The user will then see information about the song in the console as well as on the log.txt file. 
    -If the song search is left blank, the user will get information about what is unanimously known as the greatest song of all time, "The Sign" by Ace of Base.

4. do-what-it-says
    -This application comes with a file called "random.txt".  Currently on this file is the text "spotify-this-song,i want it that way".  
        In this state, the information for the song "I Want it that Way" will be displayed in the console, and logged on to log.txt.
    -The user can navigate to this file and change the text, beginning with one of the 3 commands listed above, followed by an approprate search parameter and then:
        The user enters to the command line:
            node liri.js do-what-it-says ### press enter ###
            The information will then be displayed in the command line as well as in the log.txt file. 