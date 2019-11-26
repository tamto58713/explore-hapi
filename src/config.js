'use strict';

import pug from 'pug';

module.exports = {
  engines: {
    pug: {
      module: pug
    }
  },
  relativeTo: __dirname,
  path: '../views'
}