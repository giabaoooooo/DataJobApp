const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const user = require('../modules/user');
let UserController = require('../controller/UserController');

//get layout login
// router.get('/', function (req, res, next) {
//   res.render('login', { title: 'Login Admin' });
// });
/* GET users listing. */
router.get('/list', async function (req, res, next) {
  const users = await user.find();
  // res.json(users);
  res.render('userList', { users: users });
});
// Check tài khoản FaceBook
router.post('/FaceBookCheck', async function (req, res) {
  var data = req.body.id;
  const user = await UserController.checkFaceBookID(data);
  res.send(user);
});
// Check tài khoản google
router.post('/GoogleCheck', async function (req, res) {
  var token = req.body.idtoken;
  const user = await UserController.checkGoogleID(token);
  res.send(user);
});
// Check số điện thoại
router.post('/NumberPhoneCheck', async function (req, res) {
  var phone = req.body.phone;
  const user = await UserController.checkPhoneNumber(phone);
  res.send(user);
}); 
// Đăng nhập bằng Facebook
router.post('/FacebookSignIn', async function (req, res) {
  const user = await UserController.facebookSignIn(req.body);
  res.send(user);
});
// Đăng nhập bằng Google
router.post('/GoogleSignIn', async function (req, res) {
  const user = await UserController.googleSignIn(req.body);
  res.send(user);
});
// Đăng nhập bằng Phone Number
router.post('/PhoneNumberSignIn', async function (req, res) {
  const user = await UserController.phoneNumberSignIn(req.body);
  res.send(user);
});

module.exports = router;
