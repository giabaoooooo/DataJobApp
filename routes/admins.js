const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const admin = require('../modules/admin');
const controller = require('../controller/adminController')
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Admin' });
});
router.post("/login" , async function(req,res,next){
    const admins = await admin.find();
    const username = req.body.username;
    const password = req.body.password;
    const adminLogin = admins.find(admin => admin.username === username && admin.password === password);
    if (adminLogin) {
     res.redirect('/index')
    } else {
      res.json({
        message: 'Đăng nhập thất bại',
        success: false
      });
    }
})


module.exports=router