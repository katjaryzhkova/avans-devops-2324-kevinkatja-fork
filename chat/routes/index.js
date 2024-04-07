var express = require('express');
var router = express.Router();

const { db } = require("../database");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET chat log. */
router.get('/logs', async function(req, res, next) {
  let logs = await db.collection('chatlog').find().toArray();
  res.json(logs);
});

module.exports = router;
