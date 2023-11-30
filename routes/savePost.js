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
                path: 'career_id payForm_id experience_id academic_id workType_id'
            }
        })
        .exec();
    data.reverse();
    res.json(data);
});
//delete
router.post('/delete', async function (req, res, next) {
    console.log(req.body.id);
    await savePostModules.findByIdAndDelete(req.body.id);
    res.json(true);
});

//add
router.post('/add', async function (req, res, next) {
    let { user_id, post_id } = req.body;

    var data = new savePostModules({ user_id, post_id });
    await data.save();
    res.json(data);
});

module.exports = router;