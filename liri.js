var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');
var Config = require('./keys.js');
var fs = require('fs');
var MovieName = "";
var SongName = "";
var QryURL = "";
// Load the NPM Package inquirer
var inquirer = require("inquirer");
console.log("processing LIRI") ;
// var client = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });
//var client = new Twitter(Config); 
//var params = {screen_name: 'nodejs'};
//var params = {screen_name: 'louram169'};
//client.get('statuses/user_timeline', params, function(error, tweets, response) {
//  if (!error) {
    //console.log(tweets);
 //   for(i = 0; i < tweets.length; i++)
 //   {
 //   	console.log("Tweeted on: " + tweets[i].created_at + " and the tweet is: " + tweets[i].text);
 //   }	
 // }
//});

switch(process.argv[2])
{
	case "movie-this":
		MovieName = process.argv[3];
		if(process.argv.length > 3)
		{
			for(i=4; i <process.argv.length; i++)
			{
				MovieName = MovieName + " " + process.argv[i];
			}
		}	
		QryURL = "http://www.omdbapi.com/?t=" + MovieName + "&y=&plot=short&apikey=40e9cece";
		// We then run the request module on a URL with a JSON
		//request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {
		request(QryURL, function(error, response, body) {
		  // If there were no errors and the response code was 200 (i.e. the request was successful)...
		  if (!error && response.statusCode === 200) {

		    // Then we print out the imdbRating
		    console.log(MovieName);
		    var sTitle = JSON.parse(body).Title;
		    var sYear = JSON.parse(body).Year;
		    var sRating = JSON.parse(body).imdbRating;
		    var sRotTomRate = JSON.parse(body).Ratings[1].Value;
		    var sCtry= JSON.parse(body).Country;
		    var sLang = JSON.parse(body).Language;
		    var sPlot = JSON.parse(body).Plot;
		    var sActors = JSON.parse(body).Actors;
		    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
		    console.log("The Movie Tite is: " + sTitle + " \nYear Released is: " + sYear + " \nThe Rating is: " + sRating
		    	         + " \nThe Rotten Tomatoes Rating is: " + sRotTomRate + " \nCountry is: " + sCtry+ " \nThe Language is: "
		    	         + sLang + " \nThe Plot is: " + sPlot + " \nThe Actors are " + sActors);
		  }
		});
	break;
	
	case "spotify-this-song":
		//SongName = process.argv[3];
		//SongName = "All the Small Things";
		SongName = "";
		QryURL = "";

		if(process.argv.length > 3)
		{
			for(i=3; i <process.argv.length; i++)
			{
				SongName = SongName + " " + process.argv[i];
			}
		}
		console.log(SongName);
		var spotify = new Spotify({
  			id: '938cfec40fe543039342094cdefe3202',
  			secret: '6a879c11103145e48d0c78996c6c5ff8'
			});
 
			spotify
  				//.search({ type: 'track', query: 'All the Small Things' })
  				.search({ type: 'track', query: SongName })
  				.then(function(response) {
    			//console.log(response);
    			//for(i=0; i < response.artists.length; i++)
    			//{
    				//the name of artists
    				console.log("The name of the Singer is: " + response.tracks.items[0].artists[0].name);
    				//name of the song
    				console.log("The Name of the Song is: " + response.tracks.items[0].name);
    				//link to the song
    				console.log("The Spotify URI is: " + response.tracks.items[0].uri);
    				//name of the album
    				console.log("The Album Name is: " + response.tracks.items[0].album.name);

    			//}	
  			})
  			.catch(function(err) {
    			console.log(err);
  			});		
	break;

	case "my-tweets":
		var client = new Twitter(Config); 

		var params = {screen_name: 'louram169'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
  			if (!error) {
    			//console.log(tweets);
    			for(i = 0; i < tweets.length; i++)
    			{
    				console.log("Tweeted on: " + tweets[i].created_at + " and the tweet is: " + tweets[i].text);
    			}	
  			}
		});
	break;

	case "do-what-it-says":

			var dataArr = [];
			console.log('reading file');
			fs.readFile("random.txt", "utf8", function(error, data) {
			   if (error)
			       return console.log(error);
			   //console.log(data);
			   // console.log(data);
			   dataArr = data.split(",");
			   SongName = dataArr[1];
			   console.log(SongName);
			   QryURL = "";
			   //console.log(dataArr);
			   // console.log(SongName);
				var spotify = new Spotify({
	  			id: '938cfec40fe543039342094cdefe3202',
	  			secret: '6a879c11103145e48d0c78996c6c5ff8'
				});
	 
				spotify
	  				//.search({ type: 'track', query: 'All the Small Things' })
	  				.search({ type: 'track', query: SongName })
	  				.then(function(response) {
	    			//console.log(response);
	    			//for(i=0; i < response.artists.length; i++)
	    			//{
	    				//the name of artists
	    				console.log("The name of the Singer is: " + response.tracks.items[0].artists[0].name);
	    				//name of the song
	    				console.log("The Name of the Song is: " + response.tracks.items[0].name);
	    				//link to the song
	    				console.log("The Spotify URI is: " + response.tracks.items[0].uri);
	    				//name of the album
	    				console.log("The Album Name is: " + response.tracks.items[0].album.name);

	    			//}	
	  			})
	  			.catch(function(err) {
	    			console.log(err);
	  			});		
			})
			
		
			
		
	break;
}