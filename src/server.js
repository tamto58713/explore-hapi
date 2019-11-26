'use strict';

import Hapi from '@hapi/hapi';
import Vision from '@hapi/vision';
import Inert from '@hapi/inert';
import Path from 'path';

import router from './router';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      files: {
          relativeTo: Path.join(__dirname, '../public')
      }
    }
  });

  await server.register(Inert);
  await server.register(Vision);
  await server.route(router);

  server.views(require('./config'));

  await server.start();
  console.log(`Server running on %s`, server.info.uri);
}

module.exports.server = init;