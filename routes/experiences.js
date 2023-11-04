const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var experienceModel = require('../modules/experience');

//lấy danh sách experience
router.get('/list',async function(req, res, next) {
  const data = await experienceModel.find();
  res.json(data);
});

//thêm mới
router.post('/add', async function(req, res, next) {
  const data = new experienceModel({
    e_title: req.body.e_title,
  });
  await data.save();
  res.json(data);
});

module.exports = router;