var tmdbApi = 'a4e5136717cef17c7b2d9c9331196e91';
var nytApi = 'dWR7musz8J5oEwVOdiYZeCsFGdcOnDDO';

var askURL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=' + nytApi;

$.ajax({
    url: askURL,
    method: 'GET'
}).then(function (response) {
    console.log(response)

})