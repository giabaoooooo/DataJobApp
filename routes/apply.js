const express = require('express');
const router = express.Router();
const applyModules = require('../modules/apply');
const applyController = require('../controller/applyController');
const notificationController = require('../controller/notificationController');
const cvModules = require('../modules/cv');

//get all
router.get('/list', async function (req, res, next) {
    var data = await applyModules.find().populate('post_id').populate('cv');
    for (var i = 0; i < data.length; i++) {
        if (data[i].post_id.users_id == user) {
            console.log(data[i]);
            apply.push(data[i]);
        }
    }
    res.json({ message: "Lấy danh sách thành công", apply });
});
// Get all real
router.get('/listAll', async function (req, res, next) {
    var data = await applyModules.find();
    res.json(data);
});
// Get all accept
router.get('/listAllAccept', async function (req, res, next) {
    var data = await applyModules.find({ status: 3 });
    res.json(data);
});

//--------------------------------------APP-----------------------------------------
//add new 
router.post('/add', async function (req, res, next) {
    let { receiver_id, sender_id, post_id, cv_id, salary } = req.body;
    let category = 0;
    let seen = 0;
    try {
        let data = await applyController.insert(sender_id, receiver_id, post_id, cv_id, salary);
        let Data = await notificationController.insert(receiver_id, sender_id, post_id, cv_id, category, seen);
        res.json({ data, Data });
    } catch (error) {
        console.log(error);
    }
})
//Get applied theo userid
router.post('/listMyApplied', async function (req, res, next) {
    var data = await applyModules.find({ user_id: req.body.id }).populate('post_id').populate('cv_id');
    data.reverse();
    res.json(data);
});
// update status accept
router.post('/updateAcceptForUser', async function (req, res, next) {
    let { receiver_id, id, sender_id, post_id, cv_id, salary } = req.body;
    let category = 1;
    let seen = 0;
    try {
        let data = await applyController.updateAccept(id);
        await notificationController.insert(receiver_id, sender_id, post_id, cv_id, category, seen);
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});
//---------------------------- Employee -----------------------------------//

//get applited theo employers
router.post('/listApply', async function (req, res, next) {
    var data = await applyModules.find({ receiver_id: req.body.id }).populate('post_id').populate('cv_id');
    data.reverse();
    res.json(data);
});

// get applied theo employer va cv id
router.post('/CvApply', async function (req, res, next) {
    let { id, cv_id } = req.body;
    var data = await applyModules.find({ _id: id, cv_id: cv_id }).populate('post_id').populate('cv_id');
    res.json(data);
});
// get applied theo employer va cv id
router.post('/CvApplySender', async function (req, res, next) {
    let { id, cv_id } = req.body;
    var data = await applyModules.find({ user_id: id, _id: cv_id }).populate('post_id').populate('cv_id');
    res.json(data);
});
// update status
router.post('/update', async function (req, res, next) {
    try {
        let data = await applyController.update(req.body.id);
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});
// update status accept
router.post('/updateAccept', async function (req, res, next) {
    let { receiver_id, id, sender_id, post_id, cv_id, salary } = req.body;
    let category = 1;
    let seen = 0;
    try {
        let data = await applyController.updateAccept(id);
        await notificationController.insert(receiver_id, sender_id, post_id, cv_id, category, seen);
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});

// update status reject
router.post('/updateReject', async function (req, res, next) {
    let { receiver_id, id, sender_id, post_id, cv_id, } = req.body;
    let category = 1;
    let seen = 0;
    try {
        let data = await applyController.updateReject(req.body);
        await notificationController.insert(receiver_id, sender_id, post_id, cv_id, category, seen);
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});
// update status bargain
router.post('/updateBargain', async function (req, res, next) {
    let { receiver_id, id, bargain_salary, sender_id, post_id, cv_id, } = req.body;
    console.log("ok : ", post_id, sender_id);
    let category = 2;
    let seen = 0;
    try {
        let data = await applyController.updateBargain(req.body);
        await notificationController.insert(receiver_id, sender_id, post_id, cv_id, category, seen);
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});
//Lấy danh sách hồ sơ ứng tuyển chưa đọc
router.post('/UnRead', async function (req, res, next) {
    var data = await applyModules.find({ receiver_id: req.body.id, status: 0 });
    data.reverse();
    res.json(data);
});
//Lấy danh sách hồ sơ ứng tuyển đã đọc
router.post('/Pending', async function (req, res, next) {
    var data = await applyModules.find({ receiver_id: req.body.id, status: 1 });
    data.reverse();
    res.json(data);
});
//Lấy danh sách hồ sơ ứng tuyển đã bị từ chối
router.post('/Reject', async function (req, res, next) {
    var data = await applyModules.find({ receiver_id: req.body.id, status: 2 });

    data.reverse();
    res.json(data);
});
//Lấy danh sách hồ sơ ứng tuyển đã được duyệt
router.post('/Accept', async function (req, res, next) {
    var data = await applyModules.find({ receiver_id: req.body.id, status: 3 });
    data.reverse();
    res.json(data);
});
//Lấy danh sách hồ sơ ứng tuyển đang thương lượng
router.post('/Bargain', async function (req, res, next) {
    var data = await applyModules.find({ receiver_id: req.body.id, status: 4 });
    data.reverse();
    res.json(data);
});

module.exports = router;