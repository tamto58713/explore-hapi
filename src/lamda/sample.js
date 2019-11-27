module.exports = async (request, handler) => {
  await handler.state('token', 'asdfsdfsd');
  return handler.response('Hello World')
}