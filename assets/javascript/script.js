function search(movie) {


var tmdbApi = 'a4e5136717cef17c7b2d9c9331196e91';
var nytApi = 'dWR7musz8J5oEwVOdiYZeCsFGdcOnDDO';

var askURL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='+moviePick+'&api-key=' + nytApi;
var tmdbURL =  'https://api.themoviedb.org/3/search/movie?api_key='+tmdbApi+'&language=en-US&query='+movie+'&page=1&include_adult=false';


$.ajax({
    url: tmdbURL,
    method: 'GET'
}).then(function (response) {
    console.log(response)
    $('#resultsList').empty(); //clear the search results on search 

//here is where the search results list is constructed. will need to loop through the based on the number of results


//this loop will loop through all of the results given to us from TMDB api, each result's title is appendended to the list of search results
for (let i = 0; i < response.results.length; i++) {
    movieTitle = response.results[i].title;
    resultDiv = $("<button class='button is-ghost'>").text(movieTitle)
    $('#searchResults').append(resultDiv);                  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<----  need to add an empty <div> right under the search bar in the HTML file

}

})

} //end of search function.



$("#input").on("click", function(event){  //this is the event handler for the search button
    event.preventDefault(); 
    var searchQuery = this.text();

    search(searchQuery); //calls the function that will call TMDB for the movie results list
    

})

$("#searchList").on("click", ".btn", function(event){
    event.preventDefault();
    nytResults($(this).text());

})

function nytResults(movieName) {

    //here all the info from the NYT is populated into the page.
    
}



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
	