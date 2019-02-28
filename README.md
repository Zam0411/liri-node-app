# liri-node-app

The purpose of this app is to get API information using Node.js from the spotify API, OMBD API and Bands In Town API.
Bands In Town information that appears will be a bands concert list if they are currently on tour.
OMBD information that appears will be for the title, year, rating for IMBD and Rotten Tomatoes, country produced, langauge, plot, and actors involved in the film.
Spotify information that appears is the artist, name of song, preview link and the album name.

Here are the instructions for using the app along with Node.js:

----------------------------------------------------------------------------------------------------------------
node liri.js concert-this <artist/band name here>


This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:


Name of the venue
Venue location
Date of the Event (use moment to format this as "MM/DD/YYYY")


----------------------------------------------------------------------------------------------------------------
node liri.js spotify-this-song '<song name here>'


This will show the following information about the song in your terminal/bash window

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from

If no song is provided then your program will default to "The Sign" by Ace of Base.
-----------------------------------------------------------------------------------------------------------------

node liri.js movie-this '<movie name here>'

This will output the following information to your terminal/bash window:

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
   
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
