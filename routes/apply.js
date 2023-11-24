const express = require('express');
const router = express.Router();
const applyModules = require('../modules/apply');
const applyController = require('../controller/applyController');
const cvModules = require('../modules/cv');

//get all
router.get('/list', async function (req, res, next) {
    const user = "655b3b0e806637ac5b292b4c";
    const apply = [];

    var data = await applyModules.find().populate('post_id').populate('cv');
    for (var i = 0; i < data.length; i++) {
        if (data[i].post_id.users_id == user) {
            console.log(data[i]);
            apply.push(data[i]);
        }
    }
    res.json({ message: "Lấy danh sách thành công", apply });

    // console.log(data);
});

//add new 
router.post('/add', async function (req, res, next) {
    try {
        const data = new applyModules({
            post_id: "656065542aa3e77c890f57d7",
            cv: "655f3ae3f8a697a6633c53c4"
        });
        await data.save();
        console.log("Thêm mới thành công");
        res.json({ message: "Thêm mới thành công", data: data });
    } catch (error) {
        console.log(error);
    }
})

//posst new cv
router.post('/news', async function (req, res, next) {
    try {
        const cv = new cvModules(req.body);
        const newCv = new cvModules({
            current_andress: "32/1 đường 1, phường 2, quận 3, tp HCM",
            title: "MDENENN",
            experience_id: "655deac79a5b0ffa7ffd513f",
            career_id: "6558505e70f5b03183a9c903",
            acedemic_id: "655de7129a5b0ffa7ffd5137",
            worktype_id: "653e66b38e88b23b41388e3c",
            payform_id: "355de22b9a5b0ffa7ffd5132",
            describe: "Mô tả công việc",
            user_id: "655b3b0e806637ac5b292b4c",
        });
        await newCv.save();
        // res.json({ message: "Thêm mới thành công", idCv: data._id });
        try {
            const data = new applyModules({
                post_id: "656065542aa3e77c890f57d7",
                cv: newCv._id,
            });
            await data.save();
            console.log("Thêm mới thành công");
            res.json({ message: "Thêm mới thành công", data: data });
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
})




module.exports = router;