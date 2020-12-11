// complete your db configuration
const knex = require('knex');

const config = require('../knexfile'); //sets configuration for different environments

const db = knex(
  process.env.NODE_ENV === 'production'
    ? config.production
    : config.development
);

module.exports = db;