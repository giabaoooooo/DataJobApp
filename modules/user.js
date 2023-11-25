const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const user = new Schema({
    _id: ObjectId,
    username: String,
    password: String,
    displayName: String,
    birthday: String,
    andress: String,
    email: String,
    gender: String,
    phone:Number,
});
module.exports = mongoose.model.users || mongoose.model('user', user);