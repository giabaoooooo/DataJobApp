const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const careerModel = require('../modules/career');

//lấy danh sách career
router.get('/list',async function(req, res, next) {
  const data = await careerModel.find();
  res.json(data);
});

module.exports = router;