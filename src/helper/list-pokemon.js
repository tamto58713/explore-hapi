'use strict';

const  { pokemon } = require('../pokemon');

const getListPokemon = () => {
  let listPokemon = [];

  for (let i = 0; i < 809; i++) {
    let poke = {
        ...pokemon[i],
        imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatUrl(i + 1)}.png`
    };
    listPokemon.push(poke);
  }
  return listPokemon;
}

const formatUrl = (num) => {
  if (num >= 100)
      return num.toString()
  if (num >= 10)
      return "0" + num
  return "00" + num
}

module.exports = {
  getListPokemon,
  formatUrl
}