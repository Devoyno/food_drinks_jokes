var DrinkSave = [];

// saved drinks 
function getSaveddrinks(){
    if(!localStorage.getItem("DrinkSave")){
        return;
    }
    savedDrinks = [JSON.parse(localStorage.getItem("DrinkSave"))];
    for (i = 0; i < savedDrinks[0].length; i++){
        $('<option/>').text(savedDrinks[0][i].name).appendTo("#StoredDrinks");
    };
}

getSaveddrinks();

$("#StoredDrinks").change(function(){
    var Drink_name = $("#StoredDrinks").val();
    var searchType = "search.php?s=" + Drink_name;
    $("#drink-ingredients").empty();
    drink(searchType);
})

// random button 
$("#randomDrink").on("click", function(event) {
    event.preventDefault();
    var searchType = "random.php";
    $("#drink-ingredients").empty();
    drink(searchType);
    console.log(DrinkSave);
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
    $("#drink-title").html("<h1><strong>" + response.drinks[0].strDrink);
    $("#drink-image").attr("src", response.drinks[0].strDrinkThumb);

    while (response.drinks[0]["strIngredient" + number] != null){
       var ingLi =  $("<li>").text(response.drinks[0]["strMeasure" + number] + " " + response.drinks[0]["strIngredient" + number]);
        $("#drink-ingredients").append(ingLi);
        number++;
    };

    $("#drink-directions").text("Directions: " + response.drinks[0].strInstructions);


   
});
}

 // save button 
 $("#drinkSave").on("click", function(){
    localStorage.getItem("DrinkSave");
    var textContent = {name: $("#drink-title").text()};
    console.log(DrinkSave);
    DrinkSave.push(textContent);
    localStorage.setItem("DrinkSave", JSON.stringify(DrinkSave));
});