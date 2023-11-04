var express = require('express');
var router = express.Router();
var statusModel = require('../modules/status');

//lấy danh sách
router.get('/list',async function(req, res, next) {
  const data = await statusModel.find();
  res.json(data);
});


module.exports = router;
