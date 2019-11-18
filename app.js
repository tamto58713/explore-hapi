'use strict';

require('dotenv').config({ silent: true});
const { server } = require('./build/server');

server();