const headerContainer = document.getElementById('header-container');
const textContainer = document.getElementById('text-container');
const videoContainer = document.getElementById('video-container');
const getMeal = document.getElementById('get-meal');

async function getRandomMeal() {
  const resp = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php'
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  addContent(randomMeal);
  return randomMeal;
}

getMeal.addEventListener('click', () => {
  console.log(getRandomMeal());
});

headerContainer.addEventListener('click', () => {
  headerContainer.classList.add('active');
});

function addContent(randomMeal) {
  textContainer.innerHTML = `
    
    <div class="left">
      <img src="${randomMeal.strMealThumb}" alt="meal thumb">
      <ul class="sub-desc">
        <li><strong>Category</strong>: ${randomMeal.strCategory} <li>
        <li><strong>Area</strong>: ${randomMeal.strArea}<li>
        <li><strong>Tags</strong>: ${randomMeal.strTags
          .split(',')
          .join(', ')}<li>
      </ul>
      <div class="ingredients">
        <h4>Ingredients</h4>
        ${getIngredients(randomMeal)
          .map(ingredient => `<li>${ingredient}</li>`)
          .join('')}
      </div>
    </div>
    <div class="right">
      <h2>${randomMeal.strMeal}</h2>
      <div class="text">${randomMeal.strInstructions}</div>
    </div>    
  `;

  videoContainer.innerHTML = `
    <h3>Video Recipe</h3>
			<div class="videoWrapper">
				<iframe width="420" height="315" src="https://www.youtube.com/embed/${randomMeal.strYoutube.slice(
          -11
        )}">
				</iframe>
			</div>
    `;
}

function getIngredients(randomMeal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (randomMeal[`strIngredient${i}`]) {
      ingredients.push(
        `${randomMeal[`strIngredient${i}`]} ---- ${
          randomMeal[`strMeasure${i}`]
        }`
      );
    } else {
      break;
    }
  }
  return ingredients;
}
