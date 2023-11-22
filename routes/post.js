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


//lấy danh sách
router.get('/list', async function (req, res, next) {
    const data = await postModel.find();
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
        const data = await postModel.find({ status_id: "65423efa3f8e779b5ec14e51" });//đang chờ duyệt
        res.render('dashboard/post_waiting', { posts: data });
        console.log(data);
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
        const data = await postModel.find({ status_id: "65447e2296c02dcf49965471" });//đã duyệt
        res.render('dashboard/post_allow', { posts: data });
        return data;
    } catch (error) {
        console.error(error);
    }
});


//thêm mới posts
// router.post('/add', upload.array('image'), async function (req, res, next) {
//     let list = {
//         users_id: "6550af3eb58621ab9d9caf96",
//         andress: "asdasdasd",
//         business_name: "asdasds",
//         image: "https://res.cloudinary.com/dpus5njhc/image/upload/v1699793377/nlgrpusoax7zg9ga6dz1.png",
//         quantity: 222,
//         title: "aadad",
//         career_id: "654e08be975f3b02c5fefc94",
//         payform_id: "653e66f58e88b23b41388e3d",
//         experience_id: "653e64098e88b23b41388e37",
//         acedemic_id: "653e661f8e88b23b41388e3b",
//         worktype_id: "653e66b38e88b23b41388e3c",
//         describe: "mmo",
//         age_min: 11,
//         age_max: 20,
//         wage_min: 29,
//         status_id: "65423efa3f8e779b5ec14e51"
//     };
//     const imgArray = [{"height": 467, "mime": "image/jpeg", "modificationDate": "1700048993000", "path": "file:///data/user/0/com.parttimejob/cache/react-native-image-crop-picker/Messenger_creation_0bfff3bb-5b7b-4aed-a551-10391301b320.jpeg", "size": 71434, "width": 964}, {"height": 1600, "mime": "image/jpeg", "modificationDate": "1700048993000", "path": "file:///data/user/0/com.parttimejob/cache/react-native-image-crop-picker/Screenshot_2023-11-04-16-48-47-88_dbdcc0e57d8a05e90d4ce83cad8469a1.jpg", "size": 263801, "width": 720}, {"height": 1500, "mime": "image/jpeg", "modificationDate": "1700048993000", "path": "file:///storage/emulated/0/Android/data/com.parttimejob/files/Pictures/a635aa40-8ca2-4f30-971c-17d4f3bafb3a.jpg", "size": 344023, "width": 1200}, {"height": 1356, "mime": "image/jpeg", "modificationDate": "1700048993000", "path": "file:///storage/emulated/0/Android/data/com.parttimejob/files/Pictures/570d5dbc-b404-49be-ac26-b397dd64b4fd.jpg", "size": 1132403, "width": 1017}];
//     try {
//         // image = await cloudinary.uploader.upload(req.file.path);
//         const uploadedImages = [];
//         for (const file of imgArray) {
//             const result = await cloudinary.uploader.upload(file.path.toString('base64'));
//             const newImage = new Image({
//                 public_id: result.modificationDate,
//                 url: result.path,
//             });
//             await newImage.save();
//             uploadedImages.push(newImage);
//         }
//         const data = new postModel({
//             users_id : list.users_id,
//             andress : list.andress,
//             business_name : list.business_name,
//             image: uploadedImages,
//             quantity : list.quantity,
//             title : list.title,
//             career_id : list.career_id,
//             payform_id : list.payform_id,
//             experience_id : list.experience_id,
//             acedemic_id: list.acedemic_id,
//             worktype_id : list.worktype_id,
//             describe : list.describe,
//             age_min : list.age_min,
//             age_max : list.age_max,
//             wage_min : list.wage_min,
//             wage_max : list.wage_max,
//             status_id : list.status_id
//         });
//         await data.save();
//         res.json(data)
//         console.log("Thêm mới thành công");
//     } catch (error) {
//         console.error(error);
//     }
// });


router.post('/add-post', upload.single('image'), async function (req, res, next) {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const data = new postModel({
            users_id: req.body.users_id,
            andress: req.body.andress,
            business_name: req.body.business_name,
            image: result.secure_url,
            quantity: req.body.quantity,
            title: req.body.title,
            career_id: req.body.career_id,
            payform_id: req.body.payform_id,
            experience_id: req.body.experience_id,
            acedemic_id: req.body.acedemic_id,
            worktype_id: req.body.worktype_id,
            describe: req.body.describe,
            age_min: req.body.age_min,
            age_max: req.body.age_max,
            wage_min: req.body.wage_min,
            wage_max: req.body.Wage_max,
            status_id: req.body.status_id,
        });
        await data.save();
        res.json({ message: "Thêm post thành công", data: data });
        console.log(result.secure_url);
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
    let id = req.params.id;
    console.log("ewwef", id);
    try {
        const posts = await postController.getById(id);
        console.log(posts);
        if (posts) {
            const newStatus = "65447e2296c02dcf49965471"; // Đảo ngược trạng thái hiện tại
            await postController.changeStatus(id, newStatus);
            console.log(`Change status of report ${id} to ${newStatus ? 'activated' : 'deactivated'}`);
        }
        res.redirect("/");
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

module.exports = router;