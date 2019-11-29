'use strict';

const hash = (partern) => {
  let s = '';
  for (let letter in partern) {
    s+= `${letter.charCodeAt()}#a&${String.fromCharCode(letter.charCodeAt() + 5)}%^1`;
  }
  return s;
}

const compare = (partern, hashParttern) => {
  return hash(partern) === hashParttern;
}

module.exports = {
  hash,
  compare
}
