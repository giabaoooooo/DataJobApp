const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const user = require('../modules/user');
const cv = require('../modules/cv');
const userController = require('../controller/usersController');
// const userController = require('../controller/userController')


// get layout login
// router.get('/', function(req, res, next) {
//   res.render('login', { title: 'Login Admin' });
// });
/* GET users listing. */
// router.get('/list', async function (req, res, next) {
//   const users = await user.find();
//   res.json(users);
//   // res.render('userList', { users: users });
// });


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


// Nếu nhập đúng username và password sẽ thông báo và trả về username và password
router.post('/login', async function (req, res, next) {
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
router.get('/', async (req, res, next) => {
  try {
    let users = await userController.getAll();
    users = users.map((el, index) => {
      if (el.role == 1) {
        return {
          _id: el._id,
          role: 'Nhà tuyển dụng',
          email: el.email,
          displayName: el.displayName,
          phone: el.phone,
          index: index + 1,
        }
      } else {
        return {
          _id: el._id,
          role: 'Người dùng',
          email: el.email,
          displayName: el.displayName,
          phone: el.phone,
          index: index + 1,
        }
      }
    });
    res.render('userList', { us: users }); 
  } catch (error) {
    console.log("Error in getAll():", error);
  }
});
router.post('/check', async (req, res, next) => {
  try {
    let { id } = req.body;
    let users = await userController.check(id);

    res.send(users);
    console.log(users);
  } catch (error) {
    console.log("Error in getAll():", error);
  }
});


module.exports = router;
