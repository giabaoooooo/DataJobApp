var express = require('express');
var router = express.Router();
var testimgModel = require('../modules/testimg');
const cloudinary = require('../utilis/cloudinary');
const upload = require('../Multer/Multer');

//lấy danh sách
router.get('/list', async function (req, res, next) {
    const data = await testimgModel.find();
    res.json(data);
});

//thêm mới
router.post('/add', upload.single('image'), async function (req, res, next) {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const data = new testimgModel({
            name: req.body.name,
            img: result.secure_url,
            cloudinary_id: result.public_id
        });
        await data.save();
        res.json(data);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;