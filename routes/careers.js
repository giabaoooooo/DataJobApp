const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const careerModel = require('../modules/career');
const cloudinary = require('../utilis/cloudinary');
const upload = require('../Multer/Multer');
const careerController = require('../controller/careerController');

//lấy danh sách career
router.get('/', async function (req, res, next) {
  const data = await careerModel.find();
  res.render('careers/list', { careers: data });
});

//render new career
router.get('/new-career', async function (req, res, next) {
  res.render('careers/new');
});

//thêm mới career
router.post('/add', upload.single('image'), async function (req, res, next) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = new careerModel({
      c_title: req.body.c_title,
      image: result.secure_url,
    });
    await data.save();
    res.json({ message: "Thêm mới thành công", data: data });
  } catch (error) {
    console.error(error);
  }
});


//delete
router.delete('/:id', async function (req, res, next) {
  try {
    var id = req.query.id;
    const data = await careerModel.findByIdAndDelete(id);
    res.json({ message: "Xóa thành công", data: data });
  } catch (error) {
    res.json({ message: "Xóa thất bại", data: error });
  }
});

//update career
router.put('/:id', upload.single('image'), async function (req, res, next) {
  try {
    var id = req.query.id;
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = await careerModel.findByIdAndUpdate(id, {
      c_title: req.body.c_title,
      image: result.secure_url,
    });
    res.json({ message: "Cập nhật thành công", data: data });
  } catch (error) {
    res.json({ message: "Cập nhật thất bại", data: error });
  }
});


module.exports = router;