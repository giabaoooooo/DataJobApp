const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const moment = require('moment');
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
    date: { type: Date },
    time: { type: String }
})

applySchema.pre('save', function (next) {
    const currentTime = new Date();
    this.date = new Date().toISOString().slice(0, 10);
    this.time = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
    next();
});

module.exports = mongoose.model.applies || mongoose.model('apply', applySchema);