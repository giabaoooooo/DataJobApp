const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const careerModel = require('../modules/career');
const cloudinary = require('../utilis/cloudinary');
const upload = require('../Multer/Multer');
const careerController = require('../controller/careerController');
const fs = require('fs');


//upload image
router.post('/upload-image', upload.array('images', 5), async function (req, res, next) {
  try {
    const uploader = async (path) => {
      console.log(path);
      // const result = await cloudinary.uploader.upload(path, { folder: 'Images' });
      // return result.secure_url;
    }
    const urls = [];
    const files = req.files;
    console.log(files);
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    console.log("successfully");
    res.status(200).json({
      message: "Upload thành công",
      data: urls,
    })
  } catch (error) {
    console.log(error);
  }
});

//lấy danh sách career
// router.get('/', async function (req, res, next) {
//   const data = await careerModel.find();
//   res.render('careers/list', { careers: data });
// });
router.get('/', async function (req, res, next) {
  const data = await careerController.getAll();
  res.render('careers/list', { careers: data });
  // res.json(data);
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

// //render new career
router.get('/new-career', async function (req, res, next) {
  res.render('careers/new');
});


//thêm mới career
router.post('/add', [upload.single('image'),], async function (req, res, next) {
  let { title, image } = req.body;
  try {
    img = await cloudinary.uploader.upload(req.file.path);
    await careerController.add(title, img.secure_url);
    res.redirect('/careers');
    res.json({ status: true });
  } catch (error) {
    console.error(error);
  }
});


//delete
router.delete('/delete/:id', async function (req, res, next) {
  let id = req.params.id;
  // try {
  //   const result = await careerModel.deleteOne({ _id: id });

  //   if (result.deletedCount === 1) {
  //     console.log("Xóa thành công");
  //     res.render('careers/list');

  //   } else {
  //     console.log("Xóa không thành công");
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
  try {

    await await careerModel.deleteOne({ _id: id });
    res.json({ status: true });
  } catch (error) {
    console.error(error);
    res.json({ status: false });
  }

});


router.get('/edit/:id', async function(req, res, next) {
  // get product detail
  const {id} = req.params;
  const result = await careerController.findbyId(id);
  res.render('careers/edit', {careers:result});
});

// //update career
// router.post('/edit/:id', upload.single('image'), async function (req, res, next) {
//   console.log("Trang sửa");
//   let id = req.params.id;
//   console.log(id);
//   let { c_title, img } = req.body;
//   try {
//     img = await cloudinary.uploader.upload(req.file.path);
//     await careerController.update(id, c_title, img.secure_url);
//     res.redirect('/careers');
//     console.log(img);
//   } catch (error) {
//     console.error(error);
//   }

// });

//update career
router.post('/edit/:id', upload.single('image'), async function (req, res, next) {
  let id = req.params.id;
  let career = await careerController.findbyId(id);
  let Img = req.file;
  let image;
  let one;
  if (Img == null) {
    image = career.image;
  } else {
    one = await cloudinary.uploader.upload(req.file.path);
    image = one.secure_url;
  }
  let title = req.body.title;
  try {
    // img = await cloudinary.uploader.upload(req.file.path);
    await careerController.update(id, title, image);
    res.redirect('/careers');
    res.json({ status: true });
    // console.log(img);
  } catch (error) {
    console.error(error);
  }
  // console.log(id);
});



//---------------------- APP ----------------------------------

// Get data careers
router.get('/listCareersForApp', async function (req, res, next) {
  const data = await careerController.getAll();
  res.json(data);
});

module.exports = router;