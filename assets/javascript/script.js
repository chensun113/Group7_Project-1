<<<<<<< HEAD
var key="afa38e9fd88f83e811a283779a635569"; // wait for sign up api key
var nameInputEl = document.querySelector("#start");//jquery lisener from input box;
var formSubmitHandler = function (event) {
    event.preventDefault();
    var searchname = nameInputEl.value.trim();
    if (searchname) {
      getMoiveStatus(searchname);//function
      repoContainerEl.textContent = "";
      nameInputEl.value = "";
    } else {
    //   alert(‘Please enter a correct name’);
    console.log("Wrong input");
    }
  };

  var   getMoiveStatus= function (repos, searchTerm){
    

  }
=======
function search(movie) {


var tmdbApi = 'a4e5136717cef17c7b2d9c9331196e91';
var nytApi = 'dWR7musz8J5oEwVOdiYZeCsFGdcOnDDO';

var askURL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='+moviePick+'&api-key=' + nytApi;
var tmdbURL =  'https://api.themoviedb.org/3/search/movie?api_key='+tmdbApi+'&language=en-US&query='+movie+'&page=1&include_adult=false';

//https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=hero&api-key=dWR7musz8J5oEwVOdiYZeCsFGdcOnDDO
$.ajax({
    url: tmdbURL,
    method: 'GET'
}).then(function (response) {
    console.log(response)

//here is where the search results list is constructed. will need to loop through the based on the number of results

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
	
>>>>>>> main
