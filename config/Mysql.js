const mysql = require('mysql');
const config = require('./Config')

const connection = mysql.createConnection(config.mysql);

module.exports = connection