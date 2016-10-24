var express = require('express');
var router = express.Router();
var jokes = require('../model/jokes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
