const jwt = require('jsonwebtoken');
var express = require('express');
var cvController = require('../controller/cvController');
var router = express.Router();

//thêm mới
router.post('/new', async function (req, res, next) {
    let { title, user_id, post_id, name, phone, year, email, address, experience, introduce, gender } = req.body;
    try {
        let data = await cvController.insert(title, user_id, name, phone, year, email, address, experience, introduce, gender);
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});


//lấy danh sách theo users_id
router.post('/myCVs', async function (req, res, next) {
    let data = await cvController.getMyCV(req.body.id);
    res.json(data);
});

//lấy cv mới theo users_id
router.post('/myNewCVs', async function (req, res, next) {
    let data = await cvController.getMyNewCV(req.body.id);
    res.json(data);
});

router.post('/delete', async function (req, res, next) {
    let data = await cvController.delete(req.body.id);
    res.json(data);
})
module.exports = router;