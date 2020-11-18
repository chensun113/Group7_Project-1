function search(movie) {



var tmdbApi = 'a4e5136717cef17c7b2d9c9331196e91';

var tmdbURL =  'https://api.themoviedb.org/3/search/movie?api_key='+tmdbApi+'&language=en-US&query='+movie+'&page=1&include_adult=false';

//https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=hero
$.ajax({
    url: tmdbURL,
    method: 'GET'
}).then(function (response) {
    console.log(response)
    $('#searchResults').empty(); //clear the search results on search 

//this loop will loop through all of the results given to us from TMDB api, each result's title is appendended to the list of search results
for (let i = 0; i < response.results.length; i++) {
    movieTitle = response.results[i].title;
    resultDiv = $("<button class='button is-ghost'>").text(movieTitle)

    $('#searchResults').append(resultDiv);                  //appends each result to an empty div 
    if (i>=5) {     //limits the search results to 5 items
        break
    }

}

})

} //end of search function.


//Changed ID name to searchButton (Hustin)
$("#searchButton").on("click", function(event){  //this is the event handler for the search button
    event.preventDefault(); 
    var searchQuery = $('.input').val();

    search(searchQuery); //calls the function that will call TMDB for the movie results list
    

})

$("#searchResults").on("click", function(event){
    event.preventDefault();
    nytResults($(this).text());

})

function nytResults(movieName) {
//here all the info from the NYT is populated into the page.
    var nytApi = 'dWR7musz8J5oEwVOdiYZeCsFGdcOnDDO';

    var askURL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='+movieName+'&api-key=' + nytApi;

    $.ajax({
        url: askURL,
        method: 'GET'
    }).then(function (response) {  
        
        console.log("the NYT response is: "+response) 
        //clearing out the previously entered info.
        $('#tmdbDisplayTitle').empty();
        $('#tmdbDisplayDescription').empty();
        $('#nytDisplayRating').empty();
        $('#nytDisplayOpeningDate').empty();
        $('#nytDisplaySummaryShort').empty();
        $('#nytDisplayArticle').empty();
        $('#titleSaveToCarousel').empty();

        //adding content to the divs.
        $('#tmdbDisplayTitle').text(movieName);
        $('#tmdbDisplayDescription').text(response.results[0].display_title);
        $('#nytDisplayRating').text(response.results[0].mpaa_rating);
        $('#nytDisplayOpeningDate').text("The Opening Date is: "+response.results[0].opening_date);
        $('#nytDisplaySummaryShort').text(response.results[0].summary_short);
        
        var articleURLEL = $("<a href = "+response.results[0].link.url+"></a>").text(response.results[0].link.suggested_link_text);

        $('#nytDisplayArticle').append(articleURLEL);


        var saveBtn = $("<button class='button is-ghost'>").text(movieTitle);
        $('#titleSaveToCarousel').append(saveBtn);



    

})


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