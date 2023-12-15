const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const notificationController = require('../controller/notificationController');

//thêm mới

//lấy danh sách theo users_id
router.post('/list', async function (req, res, next) {
    var data = await notificationController.getById(req.body.receiver_id);
    res.json(data);
    console.log(data);
});

module.exports = router;