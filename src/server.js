'use strict';

import Hapi from '@hapi/hapi';
import vision from '@hapi/vision';
import path from 'path';

import { User } from './models/User';
import router from './router';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST
  });

  await server.register(vision);
  await server.route(router);

  server.views(require('./config'));

  await server.start();
  console.log(`Server running on %s`, server.info.uri);
}

module.exports.server = init;