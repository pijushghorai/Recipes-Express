const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const recipeCardSection = document.querySelector("#recipe-card-section");

async function fetchRecipesForBody() {
  try {
    const responseBody = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    const bodyData = await responseBody.json();
    recipeCardSection.innerHTML = "";
    bodyData.meals.forEach((bodymeal) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("card");
      newDiv.innerHTML = `
          <div class="image">
            <img src="${bodymeal.strMealThumb}" alt="${bodymeal.strMeal}">
          </div>
          <div class="content">
            <a href="#">
              <span class="title">
                ${bodymeal.strMeal}
              </span>
            </a>
            <p>${bodymeal.strArea} Dish</p>
            <p class="desc">
              ${bodymeal.strInstructions.substr(0, 80)}.....
            </p>
          </div>`;
      const btn = document.createElement("div");
      btn.classList.add("btn");
      btn.innerHTML = `<a class="action" href="#">
          Get The Recipe
          <span aria-hidden="true"> → </span>
        </a>`;
      newDiv.appendChild(btn);

      btn.addEventListener("click", function () {
        localStorage.setItem("selectedMeal", JSON.stringify(bodymeal));
        window.open("./recipePage.html", "_blank");
      });
      recipeCardSection.appendChild(newDiv);
    });
  } catch (error) {
    console.log(error);
  }
}

async function fetchRecipes(userSearchInput) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${userSearchInput}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    recipeCardSection.innerHTML = "";
    if (data.meals) {
      data.meals.forEach((meal) => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("card");
        newDiv.innerHTML = `
          <div class="image">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          </div>
          <div class="content">
            <a href="#">
              <span class="title">
                ${meal.strMeal}
              </span>
            </a>
            <p>${meal.strArea} Dish</p>
            <p class="desc">
              ${meal.strInstructions.substr(0, 80)}.....
            </p>
          </div>`;
        const btn = document.createElement("div");
        btn.classList.add("btn");
        btn.innerHTML = `<a class="action" href="#">
          Get The Recipe
          <span aria-hidden="true"> → </span>
        </a>`;
        newDiv.appendChild(btn);

        btn.addEventListener("click", function () {
          localStorage.setItem("selectedMeal", JSON.stringify(meal));
          window.open("./recipePage.html", "_blank");
        });

        recipeCardSection.appendChild(newDiv);
      });
    } else {
      recipeCardSection.innerHTML =
        "<p>No recipes found. Please try a different search term.</p>";
    }
  } catch (error) {
    console.error("Fetch error:", error);
    recipeCardSection.innerHTML =
      "<p>There was an error fetching the recipes. Please try again later.</p>";
  }
}

searchBtn.addEventListener("click", async function () {
  const searchValue = searchInput.value.trim();
  await fetchRecipes(searchValue);
  // console.log(searchValue);
});

fetchRecipesForBody();
