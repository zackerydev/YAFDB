/* All things that have to do with the database will flow through this API */


var express = require('express')
var router = express.Router()
var mysql = require('mysql')

var config = require('../../config.json')
var cfg = config['connection-config'];

/* GET users listing. */
router.get('/users', function(req, res, next) {
	//res.send('respond with a resource')
	res.json([
		{
			id: 1,
			username: 'zgriesinger'
		}, {
			id: 2,
			username: 'kosinkadink'
		}])
})


router.get('/teams', function(req, res, next) {
	//res.send('respond with a resource')
	//We will use res.json(DATA_FROM_DB) to send data back
	var connection = mysql.createConnection(cfg);
	var SQL_QUERY = 'select * from team'
	connection.connect();
	connection.query(SQL_QUERY, (error, results, fields) => {
		console.log(results)
		res.json(results);
	})

})

router.post('/inputexample', function(req, res, next) {
	var connection = mysql.createConnection(cfg);
	var SQL_QUERY = 'SQL_QUERY' + mysql.escape(req.query.inputvar);
	connection.connect();
	connection.query(SQL_QUery, (error, results, fields) => {
		res.json(results)
	})
})

module.exports = router
