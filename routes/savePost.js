var expess = require('express');
var router = expess.Router();
var savePostModules = require('../modules/savePost');

//lấy danh sách
router.post('/list', async function (req, res, next) {
    var data = await savePostModules.find({ user_id: req.body.id })
        .populate('user_id')
        .populate({
            path: 'post_id',
            populate: {
                path: 'career_id payForm_id experience_id academic_id workType_id users_id'
            }
        })
    data.reverse();
    res.json(data);
});
//lấy danh sách 1
router.post('/list1', async function (req, res, next) {
    var data = await savePostModules.find({ user_id: req.body.id })
    data.reverse();
    res.json(data);
});
//delete by id Save Post
router.post('/delete', async function (req, res, next) {
    await savePostModules.findByIdAndDelete(req.body.id);
    res.json(true);
});
//delete by User_ID và Post_ID
router.post('/deleteWithCondition', async function (req, res, next) {
    let { user_id, post_id } = req.body;
    let data = await savePostModules.findOne({ user_id: user_id, post_id: post_id });
    if (data) {
        await savePostModules.deleteOne({ _id: data._id });
        res.json(true);
    } else {
        res.json(false);
    }
});
//add
router.post('/add', async function (req, res, next) {
    let { user_id, post_id } = req.body;

    var data = new savePostModules({ user_id, post_id });
    await data.save();
    res.json(data);
});

module.exports = router;