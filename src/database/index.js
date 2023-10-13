const moongose = require('mongoose');

require('dotenv').config()

const databaseconnection = process.env.DATABASE

moongose.connect(databaseconnection)

moongose.Promise = global.Promise;

module.exports = moongose;