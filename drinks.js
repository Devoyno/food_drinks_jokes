$("#randomDrink").on("click", function() {
    var searchType = "random.php";
    drink(searchType);
});
$("#criteria").on("click", function() {
    var query = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + $("#ingredient :selected").val();
    $.ajax ({
        url: query,
        method: 'GET'
}).then(function (response) {
    console.log(response);
    var drinkLocation = [Math.floor(Math.random() * response.drinks.length)]
    console.log(drinkLocation);
    var drinkID = (response.drinks[drinkLocation].idDrink);
    var searchType = "lookup.php?i=" + drinkID;
    drink(searchType);
});
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
    $("#drink-image").attr("src", response.drinks[0].strDrinkThumb);
    // while (response.drinks[0].strIngredient + number != null){
    //    var ingDiv =  $("<div>").text(response.drinks[0].strMeasure + number + " " + response.drinks[0].strIngredient + number);
    //     $("#drink-ingredients").append(ingDiv);
    //     var number = number + 1;
    // };
    $("#drink-ingredients").text(response.drinks[0].strMeasure1 + "  " + response.drinks[0].strIngredient1)
    $("#drink-directions").text("Directions: " + response.drinks[0].strInstructions);

});
}
