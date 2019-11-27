'use strict';

module.exports = async (request, handler) => {
  if (request.state.token) {
    return handler.redirect('/');
  }
  return handler.view('auth/login', { errs: '', user: {userName: "", password: ""}, title: "Login" })
}