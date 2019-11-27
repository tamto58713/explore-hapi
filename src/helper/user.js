'use strict';
import jwtDecode from 'jwt-decode';

const getCurrentUser = async (token) => {
  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    }
    catch(error) {
      console.log(error.message);
      return '';
    }
  }
  return user ? user.name : '';
}
module.exports = { getCurrentUser };