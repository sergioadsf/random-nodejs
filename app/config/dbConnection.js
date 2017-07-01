const mysql = require('mysql');

let connMySQL = function () {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'random'
    });
}

module.exports = function () {
    return connMySQL;
}