'use strict';

import admin from 'firebase-admin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { schemaLogin } from '../../helper/validate';

module.exports = async (request, handler) => {
  const {
    userName,
    password
  } = request.payload;

  const isValid = schemaLogin.validate({
    userName,
    password
  });


  if (isValid.error) {
    return handler.view('auth/login', { err: isValid.error.message, user: {userName , password }, title: "Login" });
  }

  let user = null;
  let id = null;
  await admin.firestore().collection('User')
    .where('userName', '==', userName)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        return;
      }
      snapshot.forEach(doc => {
        user = doc.data();
        id = doc.id;
        return;
      });
    })

  if (!user) {
    return handler.view('auth/login', { err: 'Wrong userName or password!', user: {userName , password }, title: "Login" });
  }
  
  const isValidPass = await bcrypt.compare(password, user.password);

  if (!isValidPass) {
    return handler.view('auth/login', { err: 'Wrong userName or password!', user: {userName , password }, title: "Login" });
  }
  
  const token = jwt.sign({ name: user.name }, process.env.PRIVATE_KEY);

  handler.state('token', token);
  return handler.redirect('/');
}