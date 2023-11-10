var express = require('express');
var router = express.Router();

//get home page
router.get('/list', function (req, res, next) {
    res.render('dashboard', { title: 'Dashboard' });
});

module.exports = router;