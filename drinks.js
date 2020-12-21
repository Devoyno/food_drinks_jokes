var savedDrinks = [];

// saved drinks 
function getSaveddrinks(){
    if(!localStorage.getItem("DrinkSave")){
        return;
    }
    var drinks = localStorage.getItem("DrinkSave");
    savedDrinks = drinks.split(",");
    for (i = 0; i < savedDrinks.length; i++){
        $('<option/>').text(savedDrinks[i]).appendTo("#StoredDrinks");
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

    $("#drinkDetails").html("<div><h2 id='drink-title'></h2></div><figure class='image is-128x128'><img id='drink-image' src='' alt=''></figure><div><ul id='drink-ingredients'></ul></div><div><p id='drink-directions'></p></div>");

    $("#drink-title").html("<h1><strong>" + response.drinks[0].strDrink);
    $("#drink-image").attr("src", response.drinks[0].strDrinkThumb);

    $("#drink-ingredients").append($("<li>").html("<strong>Ingredients:</strong>"));
    while (response.drinks[0]["strIngredient" + number] != null){
        if (response.drinks[0]["strMeasure" + number] == null){
            response.drinks[0]["strMeasure" + number] = "";
        }
        var ingLi =  $("<li>").text(response.drinks[0]["strMeasure" + number] + " " + response.drinks[0]["strIngredient" + number]);
        $("#drink-ingredients").append(ingLi);
        number++;
    };

    response.drinks[0].strInstructions.replace("/r/n", ".");
    $("#drink-directions").html("<strong>Directions:</strong><br>" + response.drinks[0].strInstructions);


   
});
}

 // save button 
 $("#drinkSave").on("click", function(){
    var textContent = $("#drink-title").text();
    console.log(savedDrinks);
    if (savedDrinks.indexOf(textContent) < 0){
        savedDrinks.push(textContent);
        localStorage.setItem("DrinkSave", savedDrinks);
        $('<option/>').text(textContent).appendTo("#StoredDrinks");
    }
});