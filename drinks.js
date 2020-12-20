
// random button 
$("#randomDrink").on("click", function(event) {
    event.preventDefault();
    var searchType = "random.php";
    $("#drink-ingredients").empty();
    drink(searchType);
});
// by ingredient button 
$("#criteria").on("click", function(event) {
    event.preventDefault(event);
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
    $("#drink-ingredients").empty();
    drink(searchType);
});
});


// function to fill in the webpage 
function drink(searchType) {
var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/" + searchType;
var number = 1;
$.ajax ({
    url: queryURL,
    method: 'GET'
}).then(function (response) {
    console.log(response);
    console.log(queryURL)
    $("#drink-title").html("<h1>" + response.drinks[0].strDrink);
    $("#drink-image").attr("src", response.drinks[0].strDrinkThumb);

    while (response.drinks[0]["strIngredient" + number] != null){
       var ingLi =  $("<li>").text(response.drinks[0]["strMeasure" + number] + " " + response.drinks[0]["strIngredient" + number]);
        $("#drink-ingredients").append(ingLi);
        number++;
    };

    $("#drink-directions").text("Directions: " + response.drinks[0].strInstructions);


    // save button 
    var DrinkSave = [];
    $("#drinkSave").on("click", function(){
        localStorage.getItem("DrinkSave");
        var textContent = {name: response.drinks[0].strDrink, drinkId: response.drinks[0].idDrink};
        DrinkSave.push(textContent);
        localStorage.setItem("DrinkSave", JSON.stringify(DrinkSave));
    });
});
}