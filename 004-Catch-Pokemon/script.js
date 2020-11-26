const startBtn = document.getElementById('start-btn');
const startPage = document.getElementById('starting-page');
const collectionImg = document.getElementById('collection-img');
const collectionContainer = document.getElementById('collection-container');
const collection = document.getElementById('collections');
const pikachuRunning = document.getElementById('pikachu-running');
const pikachuStill = document.getElementById('pikachu-still');
const roadContainer = document.getElementById('road-container');
const imgContainer = document.getElementById('image-container');
const pokemons = document.querySelectorAll('.pokemon');
const ballCount = document.getElementById('ball-count');
const ballContainer = document.getElementById('ball-container');
const endingPage = document.getElementById('ending-page');
const restart = document.getElementById('restart');
const exit = document.getElementById('exit');

var count = 35;
ballCount.innerText = count;

roadContainer.addEventListener('click', e => {
  count--;
  ballCount.innerText = count;
  if (ballCount.innerText <= 0) {
    endingPage.classList.add('active');
    pikachuStill.classList.add('active');
    roadContainer.classList.remove('active');
    pikachuRunning.classList.remove('active');
    imgContainer.classList.remove('active');
  }
});
const requiredNumber = 50;
function createAllCards() {
  for (let i = 1; i <= requiredNumber; i++) {
    getPokemon(Math.floor(Math.random() * 150) + 1);
  }
}
createAllCards();

async function getPokemon(id) {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await resp.json();

  createPokemonCard(pokemon);
}

function createPokemonCard(pokemon) {
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');
  var flying = false;
  if (pokemon.types[1] && pokemon.types[1].type.name == 'flying') {
    flying = true;
  }
  if (flying === true) {
    pokemonEl.classList.add('fly');
  } else {
    pokemonEl.classList.add('other');
  }

  pokemonEl.innerHTML = `
    <img class="pokemon-image" width="100px" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
  `;

  pokemonEl.addEventListener('click', count => {
    var randomNum = Math.floor(Math.random() * 100);
    if (randomNum >= 0 && randomNum <= 49) {
      pokemonEl.classList.add('caught');
      collection.innerHTML += `
        <img class="pokemon-image caught-pokemon" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
      `;
    }
  });

  imgContainer.appendChild(pokemonEl);
}

startBtn.addEventListener('click', () => {
  startBtn.classList.add('active');
  startPage.classList.add('active');
  collectionImg.classList.add('active');
  collectionContainer.classList.add('active');
  pikachuRunning.classList.add('active');
  roadContainer.classList.add('active');
  imgContainer.classList.add('active');
  ballContainer.classList.add('active');
  setTimeout(() => {
    pikachuRunning.classList.remove('active');
  }, 30000);
  setTimeout(function () {
    pikachuStill.classList.add('active');
  }, 30000);
  setTimeout(() => {
    roadContainer.classList.remove('active');
  }, 30000);
  setTimeout(() => {
    imgContainer.classList.remove('active');
  }, 30000);
  setTimeout(function () {
    endingPage.classList.add('active');
  }, 30000);
});

restart.addEventListener('click', () => {
  location.reload();
});
exit.addEventListener('click', () => {
  window.close();
});
