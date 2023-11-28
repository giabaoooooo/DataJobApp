var expess = require('express');
var router = expess.Router();
var worksaveModules = require('../modules/worksave');


//lấy danh sách
router.get('/list', async function (req, res, next) {
    var data = await worksaveModules.find().populate('user_id').populate({path: 'post_id', populate: {path: 'career_id payform_id experience_id acedemic_id worktype_id'}});
    res.json({message: "Lấy danh sách thành công", data: data});
    // console.log(data);
});


module.exports = router;    