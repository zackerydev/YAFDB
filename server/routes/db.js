/* All things that have to do with the database will flow through this API */


var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  //res.send('respond with a resource');
  res.json([
  {
  	id: 1,
  	username: 'zgriesinger'
  }, {
  	id: 2,
  	username: 'kosinkadink'
  }]);
});

module.exports = router;
