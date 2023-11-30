const express = require('express');
const router = express.Router();
const applyModules = require('../modules/apply');
const applyController = require('../controller/applyController');
const notificationController = require('../controller/notificationController');
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
});


//--------------------------------------APP-----------------------------------------
//add new 
router.post('/add', async function (req, res, next) {
    let { receiver_id, sender_id, post_id, cv_id } = req.body;
    let typeNotification = "Apply";
    try {
        await applyController.insert(post_id, cv_id);

        await notificationController.insert(receiver_id, sender_id, post_id, cv_id, typeNotification);
        res.send("Successful");
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;