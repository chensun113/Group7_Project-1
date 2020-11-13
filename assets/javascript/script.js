function search(movie) {


var tmdbApi = 'a4e5136717cef17c7b2d9c9331196e91';
var nytApi = 'dWR7musz8J5oEwVOdiYZeCsFGdcOnDDO';

var askURL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=' + nytApi;
var tmdbURL =  'https://api.themoviedb.org/3/search/movie?api_key='+tmdbApi+'&language=en-US&query='+movie+'&page=1&include_adult=false';




$.ajax({
    url: tmdbURL,
    method: 'GET'
}).then(function (response) {
    console.log(response)

})






$.ajax({
    url: askURL,
    method: 'GET'
}).then(function (response) {
    console.log(response)

})


} //end of search function.



/*
    js file structure:

hit submit function for searching->
	api call to TMDB -> response will be list of search results
	---
	code then constructs list of <ul>'s based on response of the api call
	

selction function  (this function is called when the user clicks on a move choice)
	this.text() will be the full proper name of the movie, here is where we call the NYT API
	response from NYT will provide data to construct all the main page elements.
	this function is also called when a user clicks on the carousel of previously searched movies. */
	