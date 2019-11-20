'use strict';

const Knex = require('knex');

const connection = require('../../knexfile');
const knexConnection = Knex(connection);
const { Model } = require('objection');

Model.knex(knexConnection);

class Message extends Model {
  static tableName = 'Message';
  static idColumn = 'id';
}

module.exports = { Message };