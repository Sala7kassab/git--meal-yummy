
function openNav() {
  document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('input', () => {
    let isValid = true;
    contactForm.querySelectorAll('input, textarea').forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
      }
    });
    submitButton.disabled = !isValid;
  });
}

async function searchMealsByName(name) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  displayMeals(data.meals);
}

async function searchMealsByFirstLetter(letter) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  displayMeals(data.meals);
}

async function fetchCategories() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const data = await response.json();
  displayCategories(data.categories);
}

async function fetchAreas() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const data = await response.json();
  displayAreas(data.meals);
}

async function fetchIngredients() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const data = await response.json();
  displayIngredients(data.meals);
}
async function fetchMealsByCategory(category) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  displayMeals(data.meals);
}

async function fetchMealsByArea(area) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const data = await response.json();
  displayMeals(data.meals);
}

async function fetchMealsByIngredient(ingredient) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  displayMeals(data.meals);
}

function displayMeals(meals) {
  const mealsContainer = document.createElement('div');
  mealsContainer.classList.add('row');
  meals.forEach(meal => {
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('col-md-3', 'mb-4');
    mealDiv.innerHTML = `
          <div class="card">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
              <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <a href="meal-details.html?id=${meal.idMeal}" class="btn btn-primary">View Details</a>
              </div>
          </div>
      `;
    mealsContainer.appendChild(mealDiv);
  });
  document.querySelector('.container').innerHTML = '';
  document.querySelector('.container').appendChild(mealsContainer);
}

function displayCategories(categories) {
  const categoriesList = document.getElementById('categoriesList');
  categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('col-md-3', 'mb-4');
    categoryDiv.innerHTML = `
          <div class="card" onclick="fetchMealsByCategory('${category.strCategory}')">
              <img src="${category.strCategoryThumb}" class="card-img-top" alt="${category.strCategory}">
              <div class="card-body">
                  <h5 class="card-title">${category.strCategory}</h5>
              </div>
          </div>
      `;
    categoriesList.appendChild(categoryDiv);
  });
}

function displayAreas(areas) {
  const areaList = document.getElementById('areaList');
  areas.forEach(area => {
    const areaDiv = document.createElement('div');
    areaDiv.classList.add('col-md-3', 'mb-4');
    areaDiv.innerHTML = `
          <div class="card" onclick="fetchMealsByArea('${area.strArea}')">
              <div class="card-body">
                  <h5 class="card-title">${area.strArea}</h5>
              </div>
          </div>
      `;
    areaList.appendChild(areaDiv);
  });
}

function displayIngredients(ingredients) {
  const ingredientsList = document.getElementById('ingredientsList');
  ingredients.forEach(ingredient => {
    const ingredientDiv = document.createElement('div');
    ingredientDiv.classList.add('col-md-3', 'mb-4');
    ingredientDiv.innerHTML = `
          <div class="card" onclick="fetchMealsByIngredient('${ingredient.strIngredient}')">
              <div class="card-body">
                  <h5 class="card-title">${ingredient.strIngredient}</h5>
              </div>
          </div>
      `;
    ingredientsList.appendChild(ingredientDiv);
  });
}

async function showMealDetails(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  const meal = data.meals[0];
  const mealDetails = document.getElementById('mealDetails');
  mealDetails.innerHTML = `
      <div class="card">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
          <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions}</p>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item"><strong>Area:</strong> ${meal.strArea}</li>
                  <li class="list-group-item"><strong>Category:</strong> ${meal.strCategory}</li>
                  <li class="list-group-item"><strong>Tags:</strong> ${meal.strTags}</li>
                  <li class="list-group-item"><strong>Source:</strong> <a href="${meal.strSource}" target="_blank"><button class="btn btn-info "></a></li>
                  <li class="list-group-item"><strong>YouTube:</strong> <a href="${meal.strYoutube}" target="_blank"><button class="btn btn-danger"></button></a></li>
              </ul>
          </div>
      </div>
  `;
}

document.getElementById('searchByName')?.addEventListener('input', (e) => {
  searchMealsByName(e.target.value);
});

document.getElementById('searchByFirstLetter')?.addEventListener('input', (e) => {
  searchMealsByFirstLetter(e.target.value);
});

if (window.location.pathname.endsWith('categories.html')) {
  fetchCategories();
}

if (window.location.pathname.endsWith('area.html')) {
  fetchAreas();
}

if (window.location.pathname.endsWith('ingredients.html')) {
  fetchIngredients();
}

if (window.location.pathname.endsWith('meal-details.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const mealId = urlParams.get('id');
  if (mealId) {
    showMealDetails(mealId);
  }
}





