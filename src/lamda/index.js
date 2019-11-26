'use strict';

import { getListPokemon, formatUrl } from '../helper/list-pokemon';

const currentUser = { name: 'Tam To Tran' };

module.exports = async (request, handler) => {
  return handler.view('index', { listPokemon: getListPokemon(), formatUrl, currentUser, title: "Pokedex"});
}