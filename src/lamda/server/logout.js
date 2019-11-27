'use strict';

module.exports = async (request, handler) => {
  handler.unstate('token');
  return handler.redirect('/login');
}