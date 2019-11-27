'use strict';

import admin from 'firebase-admin';
import bcrypt from 'bcrypt';

import { schemaRegister } from '../../helper/validate';

module.exports = async (request, handler) => {
  
  const {
    name,
    userName,
    email,
    password,
    repeat_password
  } = request.payload;

  const valid = schemaRegister.validate({
    name,
    userName,
    email,
    password,
    repeat_password
  })
  
  if (valid.error) {
    return handler.view('auth/register', { user: { name, userName, email, password, repeat_password }, err: valid.error.message, title: "Register"})
  }
  let isEmail = null;
  let isUserName = null;

  await admin.firestore().collection('User').where('email', '==', email).get()
    .then(snapshot => {
      if (snapshot.empty) {
        return;
      }
      snapshot.forEach(doc => {
        isEmail = doc.data();
        return;
      });
    })

  await admin.firestore().collection('User').where('userName', '==', userName).get()
    .then(snapshot => {
      if (snapshot.empty) {
        return;
      }
      snapshot.forEach(doc => {
        isUserName = doc.data();
        return;
      });
    })

  if (isEmail || isUserName) {
    return handler.view('auth/register', { user: { name, userName, email, password, repeat_password }, err: 'Email or UserName aldready Existed!', title: "Register"})
  }

  const saltRound = 10;
  const hashPassword = await bcrypt.hash(password, saltRound);

  admin.firestore().collection('User').doc().set({
    name,
    userName,
    email,
    password: hashPassword
  });

  return handler.redirect('/login');
  
}