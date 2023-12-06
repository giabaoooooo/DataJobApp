var express = require('express');
var router = express.Router();
var postModel = require('../modules/post');
const cloudinary = require('../utilis/cloudinary');
const upload = require('../Multer/Multer');
const ImageModel = require('../modules/Image');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const postController = require('../controller/postController');
const { log } = require('console');


//upload array images


//lấy danh sách
router.get('/list', async function (req, res, next) {
    const data = await postModel.find().populate('users_id', 'displayName').populate('career_id').populate('payform_id').populate('experience_id').populate('acedemic_id').populate('worktype_id').populate('status_id');
    res.json(data)
});
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
        
        const data = await postModel.find({ status_id: "65423efa3f8e779b5ec14e51"});//đang chờ duyệt
        res.render('dashboard/post_waiting', { posts: data });
        // res.json({ message: "Lấy danh sách thành công", data: data });
        // console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
});
router.get('/post-denied', async function (req, res, next) {
    try {
        const data = await postModel.find({ status_id: "65447e3996c02dcf49965472" });//Từ chối duyệt
        res.render('dashboard/post_denied', { posts: data });
        // res.json({ message: "Lấy danh sách thành công", data: data });
        return data;
    } catch (error) {
        console.error(error);
    }
});
router.get('/post-allow', async function (req, res, next) {
    try {
        const data = await postModel.find({ status_id: "65447e2296c02dcf49965471" });//đã duyệt
        res.render('dashboard/post_allow', { posts: data });
        // res.json({ message: "Lấy danh sách thành công", data: data });
        return data;
    } catch (error) {
        console.error(error);
    }
});


//thêm mới posts

router.post('/add-post', async function (req, res, next) {
    const ObjectId = "6550adfb9e1d1755f2d42ae0";
    const des = `[Ngân Hàng ACB]  
    ✨ #Cần_tuyển:
    
    ♻ #Vị_trí : Bảo vệ, Lao công ,  giữ xe .
    
    🕐 #Thời_gian_làm_việc: 13h đến Hết Khách .
    
    🗳 #Quyền_lợi : tips + doanh thu tháng, ưu đãi nhân viên,...
    
    💶 #Lương : trên 8 Triệu 
    
    📲 #Hotline :gặp (#Anh_Tài & #Chị_Tuyết)
    
    🚦 Yêu cầu :
    ✅ Chỉ nhận làm ở lại tại chỗ
    ✅ Gọi trực tiếp để nhận việc không tiếp tin nhắn .
    
    📍 CHI NHÁNH tuyển :
    * Đường : Quang Trung , Quận 12 .
    * Đường : Nguyễn Thiện Thuật , Quận 3 .
    * Đường : Bông Sao , Quận 8 .
    * Đường : Phạm Ngũ Lão , Quận 1`
    try {
    const array = ["https://res.cloudinary.com/dxrv1gdit/image/upload/v1700661118/Part-timeJobs/iwmsamz5qz9lhgpmflcc.jpg", "https://res.cloudinary.com/dxrv1gdit/image/upload/v1700661118/Part-timeJobs/ttd2ulrtwnvlkjdml7n2.jpg"];
    const data = new postModel({
        users_id: "655dc2a2594b039e167d8e38",
        address: "129 Trần Hưng Đạo, Phường 10, Quận 5, Thành phố Hồ Chí Minh",
        businessName: "Ngân Hàng ACB",
        image: array,
        quantity: 10,
        title: "Tuyển nhân viên bảo Vệ ",
        career_id: "6558620586d0490539c8353c",
        payform_id: "355de22b9a5b0ffa7ffd5132",
        experience_id: "653e64098e88b23b41388e37",
        acedemic_id: "655de6059a5b0ffa7ffd5134",
        worktype_id: "6558634415be344ac80a3b40",
        describe: des,
        ageMin: 23,
        ageMax: 31,
        wageMin: 700,
        wageMax: 900,
        status_id: "65423efa3f8e779b5ec14e51",
        gender: "655f260103fd0dec424b970d",

    });
    await data.save();
    res.json({ message: "Thêm post thành công", data: data });
    // console.log(result.secure_url);
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

//auto update status_id when click
router.get('/:id/change-status', async (req, res, next) => {
    // console.log("ABC");
    let id = req.params.id;
    // console.log(req.body);
    console.log("ewwef", id);
    try {
        const posts = await postController.getById(id);
        // console.log(posts);
        if (posts) {
            const newStatus = "65447e2296c02dcf49965471"; // Đảo ngược trạng thái hiện tại
            await postController.changeStatus(id, newStatus);
            console.log(`Change status of report ${id} to ${newStatus ? 'activated' : 'deactivated'}`);
        }
        res.redirect("/index");
    } catch (error) {
        console.log(error);
    }
    
});

//App
router.post('/upload', upload.array('images', 5), async (req, res) => {
    try {

        try {
            const uploader = async (path) => {
                const result = await cloudinary.uploader.upload(path, { folder: 'Images' });
                return result.secure_url;
            }
            const urls = [];
            const files = req.body.postImage._parts;
            console.log(files);
            for (const file of files) {
                const { path } = file;
                const newPath = await uploader(path);
                urls.push(newPath);
                fs.unlinkSync(path);
            }
            console.log("successfully");
            res.status(200).json({
                message: "Upload thành công",
                data: urls,
            })
        } catch (error) {
            console.log(error);
        }

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