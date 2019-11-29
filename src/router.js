'use strict';

module.exports = [
  {
    path: '/',
    method: 'GET',
    handler: require('./lamda/index')
  },
  {
    path: '/pokemon/{id}',
    method: 'GET',
    handler: require('./lamda/detail-pokemon')
  },
  {
    path: '/login',
    method: 'GET',
    handler: require('./lamda/client/login')
  },
  {
    path: '/login',
    method: 'POST',
    handler: require('./lamda/server/login')
  },
  {
    path: '/register',
    method: 'GET',
    handler: require('./lamda/client/register')
  },
  {
    path: '/register',
    method: 'POST',
    handler: require('./lamda/server/register')
  },
  {
    path: '/logout',
    method: 'POST',
    handler: require('./lamda/server/logout')
  },
  {
    path: '/{param*}',
    method: 'GET',
    handler: {
        directory: {
            path: '.'
        }
    }
  }
]