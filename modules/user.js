const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const user = new Schema({
    //_id: ObjectId,
    messagingToken: {
        type: String,
        required: true,
    },
    googleId: {
        type: String,
        required: true,
    },
    facebookId: {
        type: String,
        required: true,
    },
    messagingToken: {
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

    },
    address: {
        type: String,

    },
    phone: {
        type: Number,
     
    },
    gender: {
        type: String,
 
    },
    role: {
        type: Number,
        required: true,
    },
    favoriteCareers: {
        type: [],
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
});
module.exports = mongoose.model.users || mongoose.model('user', user);