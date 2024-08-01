const recipeDetails = document.querySelector("#recipe-details");
const meal = JSON.parse(localStorage.getItem("selectedMeal"));

if (meal) {
  recipeDetails.innerHTML = `
    <div class="title-container">
      <h1 class="title">${meal.strMeal}</h1>
      <p class="area">${meal.strArea} Dish</p>
    </div>

    <div class="img-container">
      <img src="${meal.strMealThumb}" alt="${meal.strTags}">
    </div>

    <div class="ingredient-container">
      <h2>Ingredients</h2>
      <ul class="ingredients">
        ${fetchIngredients(meal)}
      </ul>
    </div>

    <div class="instructions-container">
        <h2>Instructions</h2>
        <p>
            ${meal.strInstructions}
        </p>
      </div>
  `;

  const title = document.querySelector('title');
  title.innerText = `Recipes Express: ${meal.strMeal}`
} else {
  recipeDetails.innerHTML = "<p>No meal details available.</p>";
}

function fetchIngredients(meal) {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measurement = meal[`strMeasure${i}`];
      ingredientsList += `<li>${ingredient} : ${measurement}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
}
