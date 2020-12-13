// complete your db configuration
const knex = require('knex');

const config = require('../knexfile'); //sets configuration for different environments

const environment = process.env.NODE_ENV || "development";

module.exports = knex(config[environment]);