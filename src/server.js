'use strict';

import Hapi from '@hapi/hapi';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World!';
    }
  })

  await server.start();
  console.log(`Server running on %s`, server.info.uri);

}

module.exports.server = init;