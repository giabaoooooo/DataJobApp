const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const currentTime = new Date();
const postSchema = new Schema({
    // _id: ObjectId,
<<<<<<< HEAD
    users_id: { type: String, ref: 'user', },
    address: String,
    businessName: String,
    image: Array,
    quantity: Number,
    title: String,
    career_id: {type: String, ref: 'career',},
    payform_id: {type: String, ref: 'payform',},
    experience_id: {type: String, ref: 'experience',},
    acedemic_id: {type: String, ref: 'acedemic',},
    worktype_id: {type: String, ref: 'worktype',},
    describe: String,
    ageMin: Number,
    ageMax: Number,
    wageMin: Number,
    wageMax: Number,
    status_id: {type: String, ref: 'status',},
    date: { type: Date, default: Date.now() },
    time: { type: String, default: currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds() },
=======
    users_id: { type: ObjectId, ref: 'users', },
    address: String,
    businessName: String,
    image: [String],
    evaluate: {
        type: Number,
        required: true
    },
    quantity: Number,
    title: String,
    career_id: String,
    payform_id: String,
    experience_id: String,
    acedemic_id: String,
    worktype_id: String,
    describe: String,
    age_min: Number,
    age_max: Number,
    wage_min: Number,
    wage_max: Number,
    status_id: String,
>>>>>>> c6af8beec4b8b6167fcbfa16140293752af80759
})

module.exports = mongoose.model.post || mongoose.model('post', postSchema);