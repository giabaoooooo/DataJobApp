var express = require('express');
var router = express.Router();
var postModel = require('../modules/post');
const cloudinary = require('../utilis/cloudinary');
const upload = require('../Multer/Multer');
const ImageModel = require('../modules/Image');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const PostController = require('../controller/postController');

//lấy danh sách theo id
router.get('/list-by-id', async function (req, res, next) {
    var id = req.query.id;
    const data = await postModel.findById(id);
    res.json(data);
});

//Lấy danh sách posts theo user_id
router.get('/list-by-user', async function (req, res, next) {
    var id = req.query.id;
    const data = await postModel.find({ users_id: id });
    res.json({ message: "Lấy danh sách thành công", data: data });
});

//lấy danh sách theo status_id
router.get('/post-waiting', async function (req, res, next) {
    try {
        const data = await postModel.find({ status_id: "65423efa3f8e779b5ec14e51" });//đang chờ duyệt
        res.render('dashboard/post_waiting', { posts: data });
        return data;
    } catch (error) {
        console.error(error);
    }
});
router.get('/post-denied', async function (req, res, next) {
    try {
        const data = await postModel.find({ status_id: "65447e3996c02dcf49965472" });//Từ chối duyệt
        res.render('dashboard/post_denied', { posts: data });
        return data;
    } catch (error) {
        console.error(error);
    }
});
router.get('/post-allow', async function (req, res, next) {
    try {
        const data = await postModel.find({ status_id: "65447e2296c02dcf49965471" });
        res.render('dashboard/post_allow', { posts: data });
        return data;
    } catch (error) {
        console.error(error);
    }
});
//lấy thông tin chi tiết post
router.get('/detail', async function (req, res, next) {
    var id = req.query.id;
    const data = await postModel.findById({ _id: id });
    res.json(data);
});
// auto update status_id when click
router.get('/change-status/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        const posts = await PostController.getById(id);
        if (posts) {
            const newStatus = "65447e2296c02dcf49965471"; // Đảo ngược trạng thái hiện tại
            await PostController.changeStatus(id, newStatus);
        }
        res.redirect("/posts/post-allow");
    } catch (error) {
        console.log(error);
    }
});
router.get('/:id/change-status', async (req, res, next) => {
    let id = req.params.id;
    try {
        const posts = await PostController.getById(id);
        if (posts) {
            const newStatus = "65447e3996c02dcf49965472"; // Đảo ngược trạng thái hiện tại
            await PostController.changeStatus(id, newStatus);
        }
        res.redirect("/posts/post-denied");
    } catch (error) {
        console.log(error);
    }
});

//=========================================================================== APP ==========================================================================//

//---------------------------- User ----------------------------------//

//Lấy danh sách gợi ý cho user
router.post('/listSuggestionForApp', async function (req, res, next) {
    const data = await PostController.getSuggestion(req.body.data);
    res.json(data)
});
//Lấy danh sách bài đăng đã lưu của user
router.post('/listSaveJobsForApp', async function (req, res, next) {
    //res.json(data)
});
//Tìm kiếm bằng từ khóa
router.post('/searchByKeyForApp', async function (req, res) {
    const data = await PostController.searchByKey(req.body.key);
    res.json(data)
});
//Tìm kiếm bằng lọc
router.post('/filterForApp', async function (req, res) {
    const data = await PostController.filter(req.body);
    res.json(data)
});
//Lấy danh sách tất cả bài đăng đã được duyệt
router.get('/list', async function (req, res, next) {
    const data = await postModel.find({ status_id: '65447e2296c02dcf49965471' })
        .populate('users_id').populate('career_id').populate('payForm_id').populate('experience_id').populate('academic_id').populate('workType_id').populate('status_id')
        .sort({ date: -1, time: -1 });
    res.json(data)
});

//---------------------------- Employee -----------------------------------//

//Lấy danh sách bài đăng của user đang hiện thị
router.post('/listJobsIsDisplayForApp', async function (req, res, next) {
    const data = await PostController.getByIsDisplayStatus(req.body.id);
    data.reverse();
    res.json(data)
});
//Lấy danh sách bài đăng của user đang chờ duyệt
router.post('/listJobsWaitingForApp', async function (req, res, next) {
    const data = await PostController.getByWaitingStatus(req.body.id);
    data.reverse();
    res.json(data)
});
//Lấy danh sách bài đăng của user bị từ chối
router.post('/listJobsDeniedForApp', async function (req, res, next) {
    const data = await PostController.getByDeniedStatus(req.body.id);
    data.reverse();
    res.json(data)
});
//Đăng tin
router.post('/postForApp', async (req, res) => {
    let { users_id, businessName, address, image, title, quantity, gender, career_id, workType_id, payForm_id, wageMin, wageMax, describe, ageMin, ageMax, academic_id, experience_id, status_id, } = req.body;
    try {
        await PostController.insert(users_id, businessName, address, image, title, quantity, gender, career_id, workType_id, payForm_id, wageMin, wageMax, describe, ageMin, ageMax, academic_id, experience_id, status_id)
        res.send("Successful");
    } catch (error) {
        console.log(error);
    }
});
// Sửa tin
router.post('/update', async (req, res) => {
    let { _id, businessName, address, image, title, quantity, gender, career_id, workType_id, payForm_id, wageMin, wageMax, describe, ageMin, ageMax, academic_id, experience_id} = req.body;
    try {
        await PostController.update(_id, businessName, address, image, title, quantity, gender, career_id, workType_id, payForm_id, wageMin, wageMax, describe, ageMin, ageMax, academic_id, experience_id)
        res.send("Successful");
    } catch (error) {
        console.log(error);
    }
});
//delete post
router.get('/delete/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        const data = await postModel.deleteOne({ _id: id });
        if (data.deletedCount === 1) {
            console.log("Xóa thành công");
            res.json({ status: true });
        } else {
            console.log("Xóa không thành công");
            res.json({ status: false });
        }
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;