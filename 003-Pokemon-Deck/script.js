const deckContainer = document.getElementById('deck-container');

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};
const requiredNumber = 150;
async function createAllCards() {
  for (let i = 1; i <= requiredNumber; i++) {
    await getPokemon(i);
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

  pokemonEl.innerHTML = `
    <div class="cycle"></div>
    <div class="image-container">
      <img class="pokemon-image" width="100px" src="https://pokeres.bastionbot.org/images/pokemon/${
        pokemon.id
      }.png" 
    </div>
    <div class="poke-info">
      <div class="poke-number">${formatId(pokemon.id)}</div>
      <div class="poke-name">${formatText(pokemon.name)}</div>
      <div class="poke-main-type">Type: ${formatText(
        pokemon.types[0].type.name
      )}</div>
    </div>
  `;
  pokemonEl.style.backgroundColor = colors[pokemon.types[0].type.name];
  deckContainer.appendChild(pokemonEl);
}

function formatText(str) {
  var result = '';
  result = str[0].toUpperCase() + str.slice(1);
  return result;
}

function formatId(num) {
  var result = '';
  if (num < 10) {
    result = '#00' + num;
  } else if (num < 100) {
    result = '#0' + num;
  } else if (num < 1000) {
    result = '#' + num;
  }
  return result;
}
