'use strict';

const Knex = require('knex');
const connection = require('../../knexfile');
const knexConnection = Knex(connection);
const { Model } = require('objection');

Model.knex(knexConnection);

class User extends Model {
  static tableName = 'User';
  static idColumn = 'id';
  static relationMappings = {
    Post: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/Post`,
      join: {
        from: 'User.id',
        to: 'Post.user_id'
      }
    },
    Message: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/Message`,
      join: {
        from: 'User.id',
        to: 'Message.user_id'
      }
    }
  };
}

module.exports = { User };