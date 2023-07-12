//iife immediatel invoked function expression
(async function () {
    const response = await fetch("./recipes.json");
    const recipes = await response.json();

    const inputElem = document.getElementById("searchInput")
    const btnElem = document.getElementById("searchBtn")
    const listElem = document.getElementById("recipe-list")
    const detailsElem = document.getElementById("recipeDetailsContainer")

    function loadRecipeDetails(recipe) {
      
       
        console.log(recipe);

       
        const recipeDetailsData = `
<h2>${recipe.title}</h2>
<ul>
${recipe.ingredients.map(function(ingredients){

    return `<li>${ingredients}</li>`
}).join("")}
</ul>
<h3>Instructions</h3>
<div>${recipe.instructions}</div>

`
detailsElem.innerHTML = recipeDetailsData;
    }
    function displaySearchResults(results) {
        detailsElem.innerHTML =  `<h3 style="color:grey">Nothing to Show here...!</h3>` ;
        if(results==""){
            
            listElem.innerHTML = `<h3 style="color:grey">Sorry No Record Found</h3>` 
        }else{

        
        listElem.innerHTML = ""
        
        results.forEach(function (recipe) {
            console.log(recipe)
            const li = document.createElement("li")
            const listItem = `
        <div class="title"><h2>${recipe.title}</h2>
        </div>
        <div class="description">${recipe.description}
        </div>
       `
            li.innerHTML = listItem
            li.addEventListener("click", function () {
                loadRecipeDetails(recipe)
            })
            listElem.appendChild(li)
        });}

    }
    function search() {
        const query = inputElem.value.toLowerCase();
        if(query==""){
alert("You haven't entered a recipe")
        }
        else{

       
        // console.log(query)

        const results = recipes.filter(function (recipe) {
            //instead of if else we ar using the line below to return true
            
            return (recipe.title.toLowerCase().includes(query) ||
                //.join() method joins all the values at all the indexes from an array
                recipe.ingredients.join(" ").toLowerCase().includes(query))

        })
        displaySearchResults(results)

    } }

    btnElem.addEventListener('click', search);
    console.log(recipes)
})();