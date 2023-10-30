const search = document.getElementById('search');
const form = document.getElementById('submit');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMealEl = document.getElementById('single-meal');
////////////////////////////////////////
const mealDBURL = 'https://www.themealdb.com/api/json/v1/1/';

////////////////////////////////////////
// HELPER METHODS
//service
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  singleMealEl.innerHTML = '';

  // Get the search term
  const term = search.value?.trim();

  if (!term) alert('Please enter a search term');

  fetch(`${mealDBURL}/search.php?s=${term}`)
    .then((res) => res.json())
    .then((data) => renderMeals(data, term));
}

function getMealById(mealId) {
  fetch(`${mealDBURL}/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      console.log(meal);
      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    }
  }

  singleMealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

////////////////////////////////////////
// render
function renderMeals(data, term) {
  if (data.meals === null) {
    resultHeading.innerHTML = '<p>There are no search results. Try Again</p>';
  }

  resultHeading.innerHTML = `<h2>Search Result for ${term}: </h2>`;

  data.meals.map((meal) => {
    const mealHTMLEl = `
        <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
            </div>
        </div>
    `;

    mealsEl.insertAdjacentHTML('beforeend', mealHTMLEl);
  });

  search.value = '';
}

////////////////////////////////////////
// Event listener
form.addEventListener('submit', searchMeal);

// Click on each Meal Item to show full detail about the meal
mealsEl.addEventListener('click', (e) => {
  e.stopPropagation();

  const targetMealEl = e.target;

  if (!targetMealEl.classList.contains('meal-info')) return false;

  const mealID = targetMealEl.getAttribute('data-mealid');
  getMealById(mealID);
});
