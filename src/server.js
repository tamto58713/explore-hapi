'use strict';

import Hapi from '@hapi/hapi';
import pug from 'pug';
import vision from '@hapi/vision';
import path from 'path';

import { User } from './models/User';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST
  });

  await server.register(vision);

  server.views({
    engines: {
      pug: {
        module: pug
      }
    },
    relativeTo: __dirname,
    path: '../src/views'
  });
  server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      return h.view('index');
    }
  })

  await server.start();
  console.log(`Server running on %s`, server.info.uri);

}

module.exports.server = init;