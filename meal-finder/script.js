const search = document.getElementById('search');
const form = document.getElementById('submit');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMealEl = document.getElementById('single-meal');

// HELPER METHODS
//service
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  singleMealEl.innerHTML = '';

  // Get the search term
  const term = search.value?.trim();

  if (!term) alert('Please enter a search term');

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then((res) => res.json())
    .then((data) => renderMeals(data, term));
}

function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

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

// Event listener
form.addEventListener('submit', searchMeal);

// Click on each Meal Item to show full meal details
mealsEl.addEventListener('click', (e) => {
  e.stopPropagation();

  const targetMealEl = e.target;

  if (!targetMealEl.classList.contains('meal-info')) return false;

  const mealID = targetMealEl.getAttribute('data-mealid');
  console.log(mealID);
});
