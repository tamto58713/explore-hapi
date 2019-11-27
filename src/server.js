'use strict';

import Hapi from '@hapi/hapi';
import Vision from '@hapi/vision';
import Inert from '@hapi/inert';
import Path from 'path';
import Admin from 'firebase-admin';

import router from './router';
import admin from 'firebase-admin';

const serviceAccount = {
  "type": process.env.FIREBASE_TYPE,
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL
}

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: process.env.HOST || 'localhost',
    routes: {
      files: {
          relativeTo: Path.join(__dirname, '../public')
      }
    }
  });

  await server.register(Inert);
  await server.register(Vision);
  await server.route(router);

  server.state('token', {
    ttl: 7 * 24 * 3600 * 1000,
    isSecure: false,
    isHttpOnly: true,
    encoding: 'none',
    clearInvalid: false,
    strictHeader: true
  });

  server.views(require('./config'));
  try {
    Admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_URL
    })
  } catch(error) {
    console.log(error);
  }
  await server.start();
  console.log(`Server running on %s`, server.info.uri);
}

module.exports.server = init;