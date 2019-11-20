'use strict';

module.exports = async (request, handler) => {
  return handler.view('index');
}