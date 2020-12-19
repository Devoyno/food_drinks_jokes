// When the Random Meal button is clicked,
$("#randomRecipe").click(function(event){
    event.preventDefault();
    getRandomMeal();
});
// Function to get the random meal
function getRandomMeal(){
    var randomURL = "https://www.themealdb.com/api/json/v1/1/random.php";
    $.ajax({
        url: randomURL,
        method: "GET"
    })
    .then(function(response){
        console.log(response);
        var recipeTitle = response.meals[0].strMeal;
        $("#recipe-title").text(recipeTitle);
        var recipeImage = response.meals[0].strMealThumb;
        $("#recipe-image").attr("src", recipeImage);
        $("#recipe-image").attr("alt", recipeTitle);
        $("#recipe-image").attr("title", recipeTitle);
        for (i = 1; i < 21; i++){
            if (response.meals[0]["strMeasure" + i.toString()] === ""){
            }
            var newIngred = $("<li>").text(response.meals[0]["strMeasure" + i.toString()] + " " + response.meals[0]["strIngredient" + i.toString()]);
            $("#recipe-ingredients").append(newIngred);
        }
        var recipeInstr = response.meals[0].strInstructions;
        $("#recipe-directions").text(recipeInstr);
    })
};

// When the user chooses a main ingrdient from a drop-down menu,
// they want to use as the main ingredient,
// and click the SEARCH button, 
// it will return a random recipe that uses that main ingredient.

// When the user chooses a meal type from a drop-down menu,
// and presses the SEARCH button, 
// it will return a random recipe that is a meal of that type.

// When the user enters the total amount of time that they want 
// the meal to take to make and press the SEARCH button,
// it will return a random recipe that will take that long to make.

// When the user likes a recipe and wants to save it,
// the user can click the save button and it will save that recipe into 
// local storage (by ID)

// When the user wants to review a saved meal recipe, 
// When the recall button is clicked,
// the user can see the saved meal recipes and choose to view one.



