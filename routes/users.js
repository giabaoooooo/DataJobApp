const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const user = require('../modules/user');

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
// router.post('/login', async function (req, res, next) {
//   const users = await user.find();
//   //tạo mảng chứa thông tin cá nhân của users
//   const userInfo = users.map(user => {
//     return {
//       age: user.age,
//       address: user.address,
//       password: user.password,
//     }
//   });

//   const username = req.body.username;
//   const password = req.body.password;
//   const userLogin = users.find(user => user.username === username && user.password === password);
//   if (userLogin) {
//     res.json({
//       message: 'Đăng nhập thành công',
//       success: true,
//       userInfo: userInfo
//     });
//   } else {
//     res.json({
//       message: 'Đăng nhập thất bại',
//       success: false
//     });
//   }
// }); 


//Nếu nhập đúng username và password sẽ thông báo và trả về username và password
router.post('/login', async function (req, res, next) {
  const users = await user.find();
  const username = req.body.username;
  const password = req.body.password;
  const userLogin = users.find(user => user.username === username && user.password === password);
  if (userLogin) {
    res.json({
      message: 'Đăng nhập thành công',
      success: true,
      userLogin: userLogin
    });
  } else {
    res.json({
      message: 'Đăng nhập thất bại',
      success: false
    });
  }
});





module.exports = router;
