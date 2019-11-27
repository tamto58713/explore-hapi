'use strict';

module.exports = async (request, handler) => { 
  if (request.state.token) {
    return handler.redirect('/');
  }
  return handler.view('auth/register', {user: {name: "", userName: "", email: "", password: "", repeat_password: ""}, err: '', title: "Register"})
}