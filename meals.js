var savedMeals = [];

// Click event handler for the button to get a random recipe
$("#randomRecipe").click(function(event){
    event.preventDefault();
    var queryURL = "https://www.themealdb.com/api/json/v1/1/random.php";
    getRandomMeal(queryURL);
});

// Function to get saved recipes
function getSavedMeals(){
    if(!localStorage.getItem("SavedMeals")){
        return;
    }
    savedMeals = [JSON.parse(localStorage.getItem("SavedMeals"))];
    for (i = 0; i < savedMeals[0].length; i++){
        $('<option/>').text(savedMeals[0][i].name).appendTo("#StoredRecipe");
    };
}

// Call to get the saved recipes
getSavedMeals();

// Function to get a random meal recipe
function getRandomMeal(queryURL){

    $("#recipeDetails").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        $("#recipeDetails").html("<div><h2 id='recipe-title'></h2></div><figure class='image is-128x128'><img id='recipe-image' src='' alt=''></figure><div><ul id='recipe-ingredients'></ul></div><div><p id='recipe-directions'></p></div>");
        var recipeTitle = response.meals[0].strMeal;
        $("#recipe-title").html("<strong>" + recipeTitle + "</strong>");
        var recipeImage = response.meals[0].strMealThumb;
        $("#recipe-image").attr("src", recipeImage);
        $("#recipe-image").attr("alt", recipeTitle);
        $("#recipe-image").attr("title", recipeTitle);
        $("#recipe-ingredients").append($("<li>").html("<strong>Ingredients:</strong>"));
        for (i = 1; i < 21; i++){
            if (response.meals[0]["strMeasure" + i.toString()] === "" || response.meals[0]["strMeasure" + i.toString()] == null){
            }
            else{
                var newIngred = $("<li>").text(response.meals[0]["strMeasure" + i.toString()] + " " + response.meals[0]["strIngredient" + i.toString()]);
                $("#recipe-ingredients").append(newIngred);
            }
        }
        var recipeInstr = response.meals[0].strInstructions;
        $("#recipe-directions").html("<strong>Directions:</strong><br>" + recipeInstr);
    }) 
}

// Function to get the meal recipe by Category
function getMealByCategory(queryURL){

    $("#recipeDetails").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        $("#recipeDetails").html("<div><h2 id='recipe-title'></h2></div><figure class='image is-128x128'><img id='recipe-image' src='' alt=''></figure><div><ul id='recipe-ingredients'></ul></div><div><p id='recipe-directions'></p></div>");
        var recipe_num = Math.floor(Math.random() * response.meals.length);
        var meal_name = response.meals[recipe_num].strMeal;
        var recipeTitle = meal_name;
        $("#recipe-title").html("<strong>" + recipeTitle + "</strong>");
        var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_name;
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response){
            var recipeImage = response.meals[0].strMealThumb;
            $("#recipe-image").attr("src", recipeImage);
            $("#recipe-image").attr("alt", recipeTitle);
            $("#recipe-image").attr("title", recipeTitle);
            $("#recipe-ingredients").append($("<li>").html("<strong>Ingredients:</strong>"));
            for (i = 1; i < 21; i++){
                if (response.meals[0]["strMeasure" + i.toString()] === "" || response.meals[0]["strMeasure" + i.toString()] == null){
                }
                else{
                    var newIngred = $("<li>").text(response.meals[0]["strMeasure" + i.toString()] + " " + response.meals[0]["strIngredient" + i.toString()]);
                    $("#recipe-ingredients").append(newIngred);
                }
            }
            var recipeInstr = response.meals[0].strInstructions;
            $("#recipe-directions").html("<strong>Directions:</strong><br>" + recipeInstr);
        })
    })
    $("#meal_cat").val("Meal Category");
}

// Function to get the meal recipe by name
function getMealByName(queryURL){

    $("#recipeDetails").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        $("#recipeDetails").html("<div><h2 id='recipe-title'></h2></div><figure class='image is-128x128'><img id='recipe-image' src='' alt=''></figure><div><ul id='recipe-ingredients'></ul></div><div><p id='recipe-directions'></p></div>");
        if (response.meals == null){
            $("#recipe-title").html("<strong>No Results Found!</strong>");
            return;
        }
        var recipe_num = Math.floor(Math.random() * response.meals.length);
        var meal_name = response.meals[recipe_num].strMeal;
        var recipeTitle = meal_name;
        $("#recipe-title").html("<strong>" + recipeTitle + "</strong>");
        var recipeImage = response.meals[recipe_num].strMealThumb;
        $("#recipe-image").attr("src", recipeImage);
        $("#recipe-image").attr("alt", recipeTitle);
        $("#recipe-image").attr("title", recipeTitle);
        $("#recipe-ingredients").append($("<li>").html("<strong>Ingredients:</strong>"));
        for (i = 1; i < 21; i++){
            if (response.meals[recipe_num]["strMeasure" + i.toString()] === "" || response.meals[recipe_num]["strMeasure" + i.toString()] == null){
            }
            else{
                var newIngred = $("<li>").text(response.meals[recipe_num]["strMeasure" + i.toString()] + " " + response.meals[recipe_num]["strIngredient" + i.toString()]);
                $("#recipe-ingredients").append(newIngred);
            }
        }
        var recipeInstr = response.meals[recipe_num].strInstructions;
        $("#recipe-directions").html("<strong>Directions:</strong><br>" + recipeInstr);
    })
    $("#meal_name").val("");
    $("#meal_name").attr("placeholder", "Meal Name...");
}

// Function to get the meal by Name and Category
function getMealByNameAndCategory(queryURL, meal_cat){

    $("#recipeDetails").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        $("#recipeDetails").html("<div><h2 id='recipe-title'></h2></div><figure class='image is-128x128'><img id='recipe-image' src='' alt=''></figure><div><ul id='recipe-ingredients'></ul></div><div><p id='recipe-directions'></p></div>");
        if (response.meals == null){
            $("#recipe-title").html("<strong>No Results Found!</strong>");
            return;
        }
        var recipe_num = Math.floor(Math.random() * response.meals.length);
        if (response.meals[recipe_num].strCategory !== meal_cat){
            var recipe_num = Math.floor(Math.random() * response.meals.length);
        }
        if (response.meals[recipe_num].strCategory !== meal_cat){
            $("#recipe-title").html("<strong>No Results Found!</strong>");
            return;
        }
        var meal_name = response.meals[recipe_num].strMeal;
        var recipeTitle = meal_name;
        $("#recipe-title").html("<strong>" + recipeTitle + "</strong>");
        var recipeImage = response.meals[recipe_num].strMealThumb;
        $("#recipe-image").attr("src", recipeImage);
        $("#recipe-image").attr("alt", recipeTitle);
        $("#recipe-image").attr("title", recipeTitle);
        $("#recipe-ingredients").append($("<li>").html("<strong>Ingredients:</strong>"));
        for (i = 1; i < 21; i++){
            if (response.meals[recipe_num]["strMeasure" + i.toString()] === "" || response.meals[recipe_num]["strMeasure" + i.toString()] == null){
            }
            else{
                var newIngred = $("<li>").text(response.meals[recipe_num]["strMeasure" + i.toString()] + " " + response.meals[recipe_num]["strIngredient" + i.toString()]);
                $("#recipe-ingredients").append(newIngred);
            }
        }
        var recipeInstr = response.meals[recipe_num].strInstructions;
        $("#recipe-directions").html("<strong>Directions:</strong><br>" + recipeInstr);
    })
    $("#meal_name").val("");
    $("#meal_name").attr("placeholder", "Meal Name...");
    $("#meal_cat").val("Meal Category");
}

// Click event handler for the search button
$("#searchRecipe").click(function(event){
    event.preventDefault();
    if ($("#meal_name").val() === "" && $("#meal_cat :selected").val() !== "Meal Category"){
        var meal_cat = $("#meal_cat :selected").val();
        var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + meal_cat;
        getMealByCategory(queryURL);
    }
    else if ($("#meal_name").val() && $("#meal_cat :selected").val() === "Meal Category"){
        var meal_name = $("#meal_name").val();
        var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_name;
        getMealByName(queryURL);
    }
    else if ($("#meal_name").val() !== "" && $("#meal_cat :selected").val() !== "Meal Category"){
        var meal_name = $("#meal_name").val();
        var meal_cat = $("#meal_cat :selected").val();
        var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_name;
        getMealByNameAndCategory(queryURL, meal_cat);
    }
});

// Click event handler for the save recipe button
$("#saveRecipe").click(function(){
    localStorage.getItem("SavedMeals");
    var mealToSave = {"name": $("#recipe-title").text()};
    savedMeals.push(mealToSave);
    localStorage.setItem("SavedMeals", JSON.stringify(savedMeals));
    return (savedMeals);
})

// Change event handler for when a user picks a saved recipe from the saved recipe drop-down menu
$("#StoredRecipe").change(function(){
    var meal_name = $("#StoredRecipe").val();
    var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_name;
    getMealByName(queryURL);
})
