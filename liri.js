require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


var action = process.argv[2];
var parameter = process.argv[3];




function switchCase() {

  switch (action) {

    case 'concert-this':
      bandsInTown(parameter);                   
      break;                          

    case 'spotify-this-song':
      spotifySong(parameter);
      break;

    case 'movie-this':
      movieInfo(parameter);
      break;

    case 'do-what-it-says':
      randText();
      break;



  }
};

function bandsInTown(parameter){

if (action === 'concert-this')
{
	var concert="";
	for (var i = 3; i < process.argv.length; i++)
	{
		concert+=process.argv[i];
	}
	print(concert);
}
else
{
	concert = parameter;
}



var queryUrl = "https://rest.bandsintown.com/artists/"+concert+"/events?app_id=codingbootcamp";


request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    var JS = JSON.parse(body);
    for (i = 0; i < JS.length; i++)
    {
      var dTime = JS[i].datetime;
        var month = dTime.substring(5,7);
        var year = dTime.substring(0,4);
        var day = dTime.substring(8,10);
        var dateForm = month + "/" + day + "/" + year
  
      print("Date: " + dateForm);
      print("Name: " + JS[i].venue.name);
      print("City: " + JS[i].venue.city);
      if (JS[i].venue.region !== "")
      {
        print("Country: " + JS[i].venue.region);
      }
      print("Country: " + JS[i].venue.country);
      print("\n---------------------------------------------------\n");

    }
  }
});
}
function spotifySong(parameter) {


  var defaultSong;
  if (parameter === undefined) {
    defaultSong = "The Sign ace of base";
  } else {
    defaultSong = parameter;
  }

  spotify.search({
    type: 'track',
    query: defaultSong
  }, function(error, data) {
    if (error) {
      print('Error occurred: ' + error);
      return;
    } else {
      print("\n---------------------------------------------------\n");
      print("Artist: " + data.tracks.items[0].artists[0].name);
      print("Song: " + data.tracks.items[0].name);
      print("Preview: " + data.tracks.items[3].preview_url);
      print("Album: " + data.tracks.items[0].album.name);
      print("\n---------------------------------------------------\n");
      
    }
  });
};
function movieInfo(parameter) {


  var findMovie;
  if (parameter === undefined) {
    findMovie = "Mr. Nobody";
  } else {
    findMovie = parameter;
  };

  var queryUrl = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=trilogy";
  
  request(queryUrl, function(err, res, body) {
  	var bodyOf = JSON.parse(body);
    if (!err && res.statusCode === 200) {
      print("\n---------------------------------------------------\n");
      print("Title: " + bodyOf.Title);
      print("Release Year: " + bodyOf.Year);
      print("IMDB Rating: " + bodyOf.imdbRating);
      print("Rotten Tomatoes Rating: " + bodyOf.Ratings[1].Value); 
      print("Country: " + bodyOf.Country);
      print("Language: " + bodyOf.Language);
      print("Plot: " + bodyOf.Plot);
      print("Actors: " + bodyOf.Actors);
      print("\n---------------------------------------------------\n");
    }
  });
};

function randText() {
fs.readFile('random.txt', "utf8", function(error, data){

    if (error) {
        return print(error);
      }

  
    var dataArr = data.split(",");
    
    if (dataArr[0] === "spotify-this-song") 
    {
      var songcheck = dataArr[1].trim().slice(1, -1);
      spotifySong(songcheck);
    } 
    else if (dataArr[0] === "concert-this") 
    { 
      if (dataArr[1].charAt(1) === "'")
      {
      	var dLength = dataArr[1].length - 1;
      	var data = dataArr[1].substring(2,dLength);
      	print(data);
      	bandsInTown(data);
      }
      else
      {
	      var bandName = dataArr[1].trim();
	      print(bandName);
	      bandsInTown(bandName);
	  }
  	  
    } 
    else if(dataArr[0] === "movie-this") 
    {
      var movie_name = dataArr[1].trim().slice(1, -1);
      movieInfo(movie_name);
    } 
    
    });

};


function print(dataLog) {

	console.log(dataLog);

	fs.appendFile('log.txt', dataLog + '\n', function(err) {
		
		if (err) return logIt('Error logging data to file: ' + err);	
	});
}

switchCase();