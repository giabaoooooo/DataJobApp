const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var cvModules = require('../modules/cv');

//lấy tất cả cv
router.get('/list', async function (req, res, next) {
    var data = await cvModules.find().populate('experience_id').populate('career_id').populate('acedemic_id').populate('worktype_id').populate('payform_id').populate('user_id');
    res.json(data);
    console.log(data);
});

//thêm mới
router.post('/add-cv', async function (req, res, next) {
    try {
        const cv = new cvModules(req.body);
        const data = new cvModules({
            current_andress: "32/1 đường 1, phường 2, quận 3, tp HCM",
            title: "Tiêu đề",
            experience_id: "655deac79a5b0ffa7ffd513f",
            career_id: "6558505e70f5b03183a9c903",
            acedemic_id: "655de7129a5b0ffa7ffd5137",
            worktype_id: "653e66b38e88b23b41388e3c",
            payform_id: "355de22b9a5b0ffa7ffd5132",
            describe: "Mô tả công việc",
            user_id: "655b3b0e806637ac5b292b4c",
        });
        await data.save();
        res.json({message: "Thêm mới thành công", data: data});
    } catch (error) {
        console.log(error);
    }
});


//lấy danh sách theo users_id
router.get('/list/:id', async function (req, res, next) {
    var data = await cvModules.find({user_id: req.params.id}).populate('experience_id').populate('career_id').populate('acedemic_id').populate('worktype_id').populate('payform_id').populate('user_id');
    res.json(data);
    console.log(data);
});



module.exports = router;