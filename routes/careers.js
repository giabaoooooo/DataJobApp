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
  res.render('index', { careers: data });
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

module.exports = router;