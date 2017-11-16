var mysql = require('mysql')


var config = require('./config.json')
var cfg = config['connection-config'];

var connection = mysql.createConnection(cfg);
var SQL_QUERY = 'select * from team'
connection.connect();
connection.query(SQL_QUERY, (error, results, fields) => {
    if(error) console.log(error)
    console.log(results)
})