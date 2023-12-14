const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const notificationController = require('../controller/notificationController');

//thêm mới

//lấy danh sách theo users_id
router.post('/list', async function (req, res, next) {
    var data = await notificationController.getById(req.body.receiver_id);
    data.reverse();
    res.json(data);
});

//lấy danh sách notifi chưa đọc theo users_id
router.post('/listNoSeen', async function (req, res, next) {
    var data = await notificationController.getByIdNoSeen(req.body.receiver_id);
    res.json(data);
});

module.exports = router;