const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi",
	"method": "POST",
	"headers": {
		"content-type": "application/xml",
		"x-rapidapi-key": "2f7924fb01msh4fbdfa9b15e7833p14f96cjsn630ddff5cada",
		"x-rapidapi-host": "mycookbook-io1.p.rapidapi.com"
	},
	"data": "https://www.jamieoliver.com/recipes/vegetables-recipes/superfood-salad/"
};

$.ajax(settings).done(function (response) {
	console.log(response);
});