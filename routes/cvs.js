const jwt = require('jsonwebtoken');
var express = require('express');
var cvController = require('../controller/cvController');
var router = express.Router();

//thêm mới
router.post('/new', async function (req, res, next) {
    let { title, user_id, career_id, name, phone, year, email, address, experience_id, introduce, gender_id, academic_id } = req.body;
    try {
        let data = await cvController.insert(title, user_id, career_id, name, phone, year, email, address, experience_id, introduce, gender_id, academic_id);
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});

//lấy danh sách theo users_id
router.post('/myCVs', async function (req, res, next) {
    let data = await cvController.getMyCV(req.body);
    res.json(data);
});

//lấy danh sách theo career
router.post('/myCVsByCareer', async function (req, res, next) {
    let data = await cvController.getMyCVByCareer(req.body);
    res.json(data);
});

//lấy cv mới theo users_id
router.post('/first', async function (req, res, next) {
    let data = await cvController.first(req.body.id);
    res.json(data);
});
// Update Cv
router.post('/update', async function (req, res, next) {
    let { title, _id, career_id, name, phone, year, email, address, experience_id, introduce, gender_id, academic_id } = req.body;
    try {
        let data = await cvController.update(title, _id, career_id, name, phone, year, email, address, experience_id, introduce, gender_id, academic_id);
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});
// Xóa Cv
router.post('/delete', async function (req, res, next) {
    let data = await cvController.delete(req.body.id);
    res.json(data);
})
module.exports = router;