module.exports = [
  {
    path: '/',
    method: 'GET',
    handler: require('./lamda/index')
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