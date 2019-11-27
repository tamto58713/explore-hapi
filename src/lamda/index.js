'use strict';

import { getListPokemon, formatUrl } from '../helper/list-pokemon';
import { getCurrentUser } from '../helper/user';

module.exports = async (request, handler) => {

  const { token } = request.state;
  const user =  await getCurrentUser(token);

  const currentUser = user ? { name: user } : { name: '' };

  return handler.view('index', { listPokemon: getListPokemon(), formatUrl, currentUser, title: "Pokedex"});
}