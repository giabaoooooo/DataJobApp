var express = require('express');
var router = express.Router();
var careerModel = require('../../modules/career');

//get home page
// router.get('/', async function (req, res, next) {
//     const data = await careerModel.find();
//     res.render('index', { careers: data });
// });

module.exports = router;