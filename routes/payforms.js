const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var payformsModel = require('../modules/payform');

//lấy danh sách payform
router.get('/list',async function(req, res, next) {
  const data = await payformsModel.find();
  res.json(data);
});

module.exports = router;