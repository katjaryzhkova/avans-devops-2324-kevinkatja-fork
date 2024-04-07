var express = require('express');
var router = express.Router();

const { db } = require("../services/database");

/* GET users listing. */
router.get('/', async function(req, res) {
  let users = await db.collection('users').find().toArray();
  res.json(users);
});

router.post('/', function(req, res) {
  db.collection('users').insertOne(req.body)
    .then((user) => res.status(201).json({ "id": user.insertedId }))
    .catch(err => res.status(500).json(err));
});

router.get('/:user_id', async function(req, res) {
  res.json(await db.collection('users').findById(req.params.user_id));
});

module.exports = router;