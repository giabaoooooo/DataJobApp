var express = require('express');
var router = express.Router();
var postModel = require('../modules/post');
const cloudinary = require('../utilis/cloudinary');
const upload = require('../Multer/Multer');
const ImageModel = require('../modules/Image');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

//lấy danh sách
router.get('/all-list-post', async function (req, res, next) {
    const data = await postModel.find();
    res.json(data);
});
//lấy danh sách theo id
router.get('/list-by-id', async function (req, res, next) {
    var id = req.query.id;
    const data = await postModel.findById(id);
    res.json(data);
});

//Lấy danh sách posts theo user_id
router.get('/list-by-user', async function (req, res, next) {
    var id = req.query.id;
    const data = await postModel.find({ users_id: id });
    res.json({ message: "Lấy danh sách thành công", data: data });
});

//lấy danh sách theo status_id
router.get('/lis-post-waiting', async function (req, res, next) {
    try {
        var id = req.query.id;
        const data = await postModel.find({ users_id: id, status_ID: "65423efa3f8e779b5ec14e51" });//đang chờ duyệt
        res.json(data);
        return data;
    } catch (error) {
        console.error(error);
    }
});
router.get('/lis-post-denied', async function (req, res, next) {
    try {
        var id = req.query.id;
        const data = await postModel.find({ users_id: id, status_ID: "65447e3996c02dcf49965472" });//Từ chối duyệt
        res.json(data);
        return data;
    } catch (error) {
        console.error(error);
    }
});
router.get('/lis-post-approved', async function (req, res, next) {
    try {
        var id = req.query.id;
        const data = await postModel.find({ users_id: id, status_ID: "65447e2296c02dcf49965471" });//đã duyệt
        res.json(data);
        return data;
    } catch (error) {
        console.error(error);
    }
});


//thêm mới
router.post('/add-post',upload.single('image'), async function (req, res, next) {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const data = new postModel({
            users_id: req.body.users_id,
            andress: req.body.andress,
            business_name: req.body.business_name,
            image: result.secure_url,
            quantity: req.body.quantity,
            title: req.body.title,
            career_id: req.body.career_id,
            payform_id: req.body.payform_id,
            experience_id: req.body.experience_id,
            acedemic_id: req.body.acedemic_id,
            worktype_id: req.body.worktype_id,
            describe: req.body.describe,
            age_min: req.body.age_min,
            age_max: req.body.age_max,
            wage_min: req.body.wage_min,
            wage_max: req.body.Wage_max,
            status_id: req.body.status_id,
        });
        await data.save();
        res.json(data);
    } catch (error) {
        console.error(error);
    }
});




    

module.exports = router;