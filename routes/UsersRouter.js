const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const user = require('../modules/user');
let UserController = require('../controller/UserController');

//get layout login
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login Admin' });
});
/* GET users listing. */
router.get('/list', async function (req, res, next) {
  const users = await user.find();
  res.json(users);
});

// Đăng nhập bằng Google
router.post('/GoogleSignIn', async function (req, res) {
  var token = req.body.idtoken;
  const user = await UserController.checkGoogleID(token);
  res.send(user);
});

// Đăng nhập bằng Phone Number
router.post('/PhoneNumberSignIn', async function (req, res) {
  var { displayName, birthDay, address, phone, gender, } = req.body.data;
  const user = await UserController.checkPhoneNumber(displayName, birthDay, address, phone, gender,);
  res.send(user);
});

module.exports = router;
