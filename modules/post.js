const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const currentTime = new Date();
const postSchema = new Schema({
    // _id: ObjectId,
    users_id: { type: String, ref: 'user', },
    andress: String,
    business_name: String,
    image: Array,
    quantity: Number,
    title: String,
    career_id: {type: String, ref: 'career',},
    payform_id: {type: String, ref: 'payform',},
    experience_id: {type: String, ref: 'experience',},
    acedemic_id: {type: String, ref: 'acedemic',},
    worktype_id: {type: String, ref: 'worktype',},
    describe: String,
    age_min: Number,
    age_max: Number,
    wage_min: Number,
    wage_max: Number,
    status_id: {type: String, ref: 'status',},
    date: { type: Date, default: Date.now() },
    time: { type: String, default: currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds() },
})

module.exports = mongoose.model.post || mongoose.model('post', postSchema);