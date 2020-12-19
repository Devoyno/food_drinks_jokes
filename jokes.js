const jokes = {
	"async": true,
	"crossDomain": true,
	"url": "https://joke3.p.rapidapi.com/v1/joke",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "07fb3ca22bmsh89a5b8b6ee8bc2ap14b5efjsn24bd9b8f6b43",
		"x-rapidapi-host": "joke3.p.rapidapi.com"
	}
};

$.ajax(jokes).done(function (response) {
    console.log(response);
    
    $("#jokes").html("<h1>" + "Joke of the day: " + response.content);
});