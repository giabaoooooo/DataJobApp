const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var cvModules = require('../modules/cv');

//lấy tất cả cv
router.get('/list', async function (req, res, next) {
    var data = await cvModules.find().populate('experience_id').populate('career_id').populate('acedemic_id').populate('work_type').populate('pay_form').populate('user');
    res.json(data);
    console.log(data);
});



module.exports = router;