$("#randomDrink").on("click", function() {
    var searchType = "random.php";
    drink(searchType);
});
$("#criteria").on("click", function() {
    var searchType = "filter.php?i=" + $("#ingredient :selected").val();
    drink(searchType);
});


function drink(searchType) {
var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/" + searchType;

$.ajax ({
    url: queryURL,
    method: 'GET'
}).then(function (response) {
    console.log(response);
    console.log(queryURL)
    $("#drink-title").html("<h1>" + response.drinks[0].strDrink);
    $("#drink-ingredients").text("ingredients: " + response.drinks[0].strIngredient1)
    $("#drink-directions").text("Directions: " + response.drinks[0].strInstructions);

});
}