const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var worktypeModel = require('../modules/worktype');

//lấy danh sách worktype
router.get('/list',async function(req, res, next) {
  const data = await worktypeModel.find();
  res.json(data);
});
module.exports = router;