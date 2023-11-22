const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const user = require('../modules/user');
const cv = require('../modules/cv');
const userController = require('../controller/usersController');

//get layout login
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Admin' });
});
/* GET users listing. */
router.get('/list', async function (req, res, next) {
  const users = await user.find();
  res.json(users);
});


//nếu nhập đúng thông tin đăng nhập sẽ hiển thị thông báo và trả về token
router.post('/login', async function (req, res, next) {
  const users = await user.find();
  const cvs = await cv.find();
  const phone = req.body.phone;
  const password = req.body.password;
  const userLogin = users.find(user => user.phone === phone && user.password === password);
  if (userLogin) {
    const token = jwt.sign({ phone: phone }, 'shhhhh');
    res.json({
      message: 'Đăng nhập thành công',
      success: true,
      token: token,
      userInfor: userLogin,
      cv: cvs
    });
  } else {
    res.json({
      message: 'Sai SĐT hoặc mật khẩu',
      success: false
    });
  }
});


//Nếu nhập đúng username và password sẽ thông báo và trả về username và password
// router.post('/login', async function (req, res, next) {
//   const users = await user.find();
//   const username = req.body.username;
//   const password = req.body.password;
//   const userLogin = users.find(user => user.username === username && user.password === password);
//   if (userLogin) {
//     res.json({
//       message: 'Đăng nhập thành công',
//       success: true,
//       userLogin: userLogin
//     });
//   } else {
//     res.json({
//       message: 'Đăng nhập thất bại',
//       success: false
//     });
//   }
// });

//đăng ký users và trả về token
router.post('/register', async function (req, res, next) {
  const {username, password, name, birthday, andress, email, gender,phone} = req.body;
  // const password = req.body.password;
  const users = await user.find();
  const userRegister = users.find(user => user.phone === phone);
  if (userRegister) {
    res.json({
      message: 'SĐT đã tồn tại',
      success: false
    });
  } else {
    const newUser = new user({
      username: "",
      phone: phone,
      password: password,
      name: "",
      birthday: "",
      andress: "",
      email: "",
      gender: "",
    });
    newUser.save();
    const token = jwt.sign({ phone: phone }, 'shhhhh');
    res.json({
      message: 'Đăng ký thành công',
      success: true,
      token: token,
      userInfor: newUser
    });
  }
});


module.exports = router;
