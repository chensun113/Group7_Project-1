var posterGlobal;
var moviePick;
var movieList = [];
init();
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
    var rowDiv = $("<div class='row is-full test'></div>")
    var resultDiv = $("<p id='searchResultStyling'></p>").text(movieTitle)

    $('#searchResults').append(rowDiv);
    $('#searchResults').append(resultDiv);                  //appends each result to an empty div 
    // if (i>=4) {    limits the search results to 5 items
    //     break
    // }
}

})

} //end of search function.


//Changed ID name to searchButton (Hustin)
$("#searchButton").on("click", function(event){  //this is the event handler for the search button
    event.preventDefault(); 
    var searchQuery = $('.input').val();

    search(searchQuery); //calls the function that will call TMDB for the movie results list
    

})

$("#searchResults").on("click","p", function(event){
    //event.preventDefault();
    nytResults($(this).text());
    moviePick = '';
    moviePick = $(this).text();
    console.log(event.target);
})

function nytResults(movieName) {
//here all the info from the NYT is populated into the page.
    var nytApi = 'dWR7musz8J5oEwVOdiYZeCsFGdcOnDDO';

    var askURL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='+movieName+'&api-key=' + nytApi;

    $.ajax({
        url: askURL,
        method: 'GET'
    }).then(function (response) {  
        console.log("NYT response is:");
        console.log(response) ;

        //console.log()

        $('#tmdbDisplayTitle').empty();
        $('#tmdbDisplayPicture').empty();
//Review  $('#tmdbDisplayDescription').empty();
        $('#nytDisplayRating').empty();
        $('#nytDisplayOpeningDate').empty();
        $('#tmdbDisplayTrailer').empty();
        $('#nytDisplaySummaryShort').empty();
        $('#nytDisplayArticle').empty();
        $('#titleSaveToCarousel').empty();

        if (response.num_results > 0) { //needs fixing.
            
        
        
            //clearing out the previously entered info.
         

            //adding content to the divs.
            $('#tmdbDisplayTitle').text(movieName);
//Review    $('#tmdbDisplayDescription').text(response.results[0].display_title);
            $('#nytDisplayRating').text("Rating: " + response.results[0].mpaa_rating);
            $('#nytDisplayOpeningDate').text("Release Date: " +response.results[0].opening_date);
            $('#nytDisplaySummaryShort').text(response.results[0].summary_short);
        
            var articleURLEL = $("<a href = "+response.results[0].link.url+"></a>").text(response.results[0].link.suggested_link_text);

            $('#nytDisplayArticle').append(articleURLEL);

            var saveBtn = $("<button id='savetocarousel' class='button is-ghost'>").text("Save to favorites");

            $('#titleSaveToCarousel').append(saveBtn);

            $.ajax({
                url: 'https://api.themoviedb.org/3/search/movie?api_key=a4e5136717cef17c7b2d9c9331196e91&language=en-US&query='+movieName+'&page=1&include_adult=false',
                method: 'GET'
            }).then(function (responsetmdb) {
                
                //Storing movie id in a variable
                var movieId = responsetmdb.results[0].id;
                posterGlobal = ''
                var posterURL ="https://image.tmdb.org/t/p/w185" + responsetmdb.results[0].poster_path;
                
                var posterEL = $('<img id="pictureMovie" src='+posterURL+'>');
                posterGlobal = responsetmdb.results[0].poster_path
                $('#tmdbDisplayPicture').append(posterEL);


                $.ajax({
                    url: 'http://api.themoviedb.org/3/movie/'+movieId+'/videos?api_key=a4e5136717cef17c7b2d9c9331196e91',
                    method: 'GET'
                }).then(function (trailertmdb) {       
                                  
                    var movieTrailer = trailertmdb.results[0].key;
                                                     
                    var trailerEl = $('<div><iframe id="trailerMovie" width="560" height="315" src="https://www.youtube.com/embed/'+movieTrailer+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
                    $('#tmdbDisplayTrailer').append(trailerEl);                     
                 
                })
            })

           
    
        }
        else{
            $('#tmdbDisplayTitle').empty();
            $('#tmdbDisplayTitle').text(movieName+" hasn't yet been reviewed by the NYT, so blame them, the API works fine. Anyway here's a poster (thanks TMDB!) so this space isn't empty:")
            $.ajax({
                url: 'https://api.themoviedb.org/3/search/movie?api_key=a4e5136717cef17c7b2d9c9331196e91&language=en-US&query='+movieName+'&page=1&include_adult=false',
                method: 'GET'
            }).then(function (responsetmdb) {

                var movieId = responsetmdb.results[0].id;
    
                var posterURL ="https://image.tmdb.org/t/p/w185" + responsetmdb.results[0].poster_path
                
                var posterEL = $('<img src='+posterURL+'>');
                
                $('#tmdbDisplayPicture').append(posterEL);

                $.ajax({
                    url: 'http://api.themoviedb.org/3/movie/'+movieId+'/videos?api_key=a4e5136717cef17c7b2d9c9331196e91',
                    method: 'GET'
                }).then(function (trailertmdb) {       
                                  
                    var movieTrailer = trailertmdb.results[0].key;
                                                     
                    var trailerEl = $('<div id="trailerMovie"><iframe width="560" height="315" src="https://www.youtube.com/embed/'+movieTrailer+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
                    $('#tmdbDisplayTrailer').append(trailerEl);                     
                 
                })

            })
        }



    

})//end of NYT api call


} 

$("#titleSaveToCarousel").on("click", function(event){
    event.preventDefault();

    //create object with poster and movie title
    movieObj = [{
        poster: posterGlobal,
        title: moviePick
    }];

    movieList.push(movieObj)
    
    localStorage.setItem("movies",JSON.stringify(movieList))
    
    // based on movieList.length add poster to carousel
    
    
})

//PLEASE LOOK AT MEEEEEEEEE 
function init() {

    //please fix this
    if (localStorage.getItem("movies") != null) {
            
        movieList = JSON.parse(localStorage.getItem("movies"));
        
        //loop through all items that are stored locally
        for (let i = 0; i < movieList.length; i++) {
            //clear div so an image can be added.
            $("#"+i).empty();



            var carouselPosterURL = "https://image.tmdb.org/t/p/w92"+movieList[i].poster;
            console.log(carouselPosterURL)
            var carouselIMG = $('<img src='+carouselPosterURL+'>');
                        //HERE add attribute to the img tag that is the name of the movie. This way we can grab it when the user clicks on it.
            $("#"+i).append(carouselIMG)

            if (i===5) {
                break
            }
            
        }
    }
    
}
// ON CLICK FUNCTION HERE for clicking on the carousel picture 

  
    
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