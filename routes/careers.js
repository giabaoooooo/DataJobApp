const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const careerModel = require('../modules/career');
const cloudinary = require('../utilis/cloudinary');
const upload = require('../Multer/Multer');
const careerController = require('../controller/careerController');

//lấy danh sách career
// router.get('/', async function (req, res, next) {
//   const data = await careerModel.find();
//   res.render('careers/list', { careers: data });
// });
router.get('/', async function (req, res, next) {
  const data = await careerController.getAll();
  res.render('careers/list', { careers: data });
  console.log("Lấy data thành công");
});

//get detail by _id
router.get('/detail', async function (req, res, next) {
  const id = req.query.id;
  const data = await careerController.getDetail(req.params._id);
  // res.render('careers/detail', { career: data });
  // console.log("Lấy data thành công");
  res.json({ data: data });
});

//render new career
router.get('/new-career', async function (req, res, next) {
  res.render('careers/new');
});

//thêm mới career
router.post('/add', upload.single('image'), async function (req, res, next) {
  let { c_title, img } = req.body;
  try {
    img = await cloudinary.uploader.upload(req.file.path);
    await careerController.add(c_title, img.secure_url);
    res.redirect('/careers');
    console.log("Thêm mới thành công");
  } catch (error) {
    console.error(error);
  }
});


//delete
router.delete('/delete/:id', async function (req, res, next) {
  let id = req.params.id;
  try {
    const result = await careerModel.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      console.log("Xóa thành công");
      res.redirect('/');

    } else {
      console.log("Xóa không thành công");
    }
  } catch (error) {
    console.error(error);
  }
});

//update career
router.get('/:id', upload.single('image'), async function (req, res, next) {
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