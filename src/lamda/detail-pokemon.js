'use strict';

import { getListPokemon } from '../helper/list-pokemon';

module.exports = async (request, handler) => {
  const { id } = request.params;
  
  const pokemon = getListPokemon().find(pokemon => {
    return pokemon.id == id
  });

  return handler.view('pokedex/detail', { pokemon, title: 'Detail Pokemon'});
}