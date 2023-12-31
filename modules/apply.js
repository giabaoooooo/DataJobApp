const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const moment = require('moment');
const currentTime = new Date();
const time = moment(currentTime).format('HH:mm:ss DD/MM/YYYY');
const applySchema = new Schema({
    // _id: ObjectId,
    user_id: {
        type: String,
        ref: 'user',
    },
    receiver_id: {
        type: String,
    },
    post_id: {
        type: String,
        ref: 'post',
    },
    cv_id: {
        type: String,
        ref: 'cvs',
    },
    status: Number,
    salary: Number,
    bargain_salary: Number,
    feedback: String,
    date: { type: Date, default: Date.now() },
    time: { type: String, default: currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds() },
})

module.exports = mongoose.model.applies || mongoose.model('apply', applySchema);