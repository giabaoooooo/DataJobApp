const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const moment = require('moment');
const currentTime = new Date();
const time = moment(currentTime).format('HH:mm:ss DD/MM/YYYY');
const notificationSchema = new Schema({
    // _id: ObjectId,
    receiver_id: {
        type: String,
        ref: 'user',
    },
    sender_id: {
        type: String,
        ref: 'user',
    },
    post_id: {
        type: String,
        ref: 'post',
    },
    cv_id: {
        type: String,
        ref: 'cvs',
    },
    typeNotification: {
        type: String,
    },
    isRead: Boolean,
    date: { type: Date, default: Date.now() },
    time: { type: String, default: currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds() },
})


module.exports = mongoose.model.notification || mongoose.model('notification', notificationSchema);