'use strict';

const Knex = require('knex');
const connection = require('../../knexfile');
const knexConnection = Knex(connection);
const { Model } = require('objection');

Model.knex(knexConnection);

class Post extends Model {
  static tableName = 'Post';
  static idColumn = 'id';
}

module.exports = { Post };