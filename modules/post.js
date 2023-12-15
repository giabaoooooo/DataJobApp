const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const currentTime = new Date();
const postSchema = new Schema({
    users_id: { type: String, ref: 'user', },
    businessName: String,
    address: String,
    image: Array,
    title: String,
    quantity: Number,
    gender: String,
    career_id: {type: String, ref: 'career',},
    payForm_id: {type: String, ref: 'payform',},
    experience_id: {type: String, ref: 'experience',},
    academic_id: {type: String, ref: 'acedemic',},
    workType_id: {type: String, ref: 'worktype',},
    describe: String,
    ageMin: Number,
    ageMax: Number,
    wageMin: Number,
    wageMax: Number,
    status_id: {type: String, ref: 'status',},
    date: { type: Date, default: Date.now() },
    time: { type: String, default: currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds() },
})

module.exports = mongoose.model.post || mongoose.model('post', postSchema);