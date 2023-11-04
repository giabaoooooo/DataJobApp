const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const acedemicModel = require('../modules/acedemic');

//lấy danh sách acedemic
router.get('/list',async function(req, res, next) {
  const data = await acedemicModel.find();
  res.json(data);
});

module.exports = router;