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
    category: {
        type: Number,
    },
    seen: {
        type: Number,
    },
    date: { type: Date },
    time: { type: String }
})

notificationSchema.pre('save', function (next) {
    this.date = new Date().toISOString().slice(0, 10);
    this.time = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
    next();
});

module.exports = mongoose.model.notification || mongoose.model('notification', notificationSchema);