const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const user = new Schema({
<<<<<<< HEAD
    // _id: ObjectId,
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    birthDay: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
=======
    _id: ObjectId,
    username: String,
    password: String,
    displayName: String,
    birthday: String,
    andress: String,
    email: String,
    gender: String,
    phone:Number,
>>>>>>> c6af8beec4b8b6167fcbfa16140293752af80759
});
module.exports = mongoose.model.users || mongoose.model('user', user);