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

//get detail
router.get('/detail', async function (req, res, next) { 
  let id = req.params.id;
  const data = await experienceModel.findById({_id: id});
  res.json(data);
});

//update
router.put('edit/:id', async function(req, res, next) {
  var id = req.query.id;
  const data = await experienceModel.findByIdAndUpdate(id, {
    e_title: req.body.e_title,
  });
  res.json({message: "Cập nhật thành công", data: data});
});

module.exports = router;