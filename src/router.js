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
    path: '/{param*}',
    method: 'GET',
    handler: {
        directory: {
            path: '.'
        }
    }
  }
]