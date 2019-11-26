'use strict';

import Hapi from '@hapi/hapi';
import vision from '@hapi/vision';
import path from 'path';

const  { pokemon } = require("./pokemon");
const db = require("./db");
import router from './router';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST
  });

  let listPokemon = []
  let currentUser = {name: ""}
  for (let i = 0; i < 809; i++) {
      let poke = {
          ...pokemon[i],
          imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + formatUrl(i + 1) + ".png"
      }
      listPokemon.push(poke)
  }

  console.log(listPokemon);
  
  await server.register(vision);
  await server.route(router);

  server.views(require('./config'));

  await server.start();
  console.log(`Server running on %s`, server.info.uri);
}

const formatUrl = (num) => {
  if (num >= 100)
      return num.toString()
  if (num >= 10)
      return "0" + num
  return "00" + num
}

module.exports.server = init;