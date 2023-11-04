const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var cvModules = require('../modules/cv');

//lấy tất cả cv
router.get('/list', async function (req, res, next) {
    var data = await cvModules.find().populate('experience' ).populate('career').populate('acedemic').populate('work_type').populate('pay_form').populate('user');
    res.json(data);
});



module.exports = router;