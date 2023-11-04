const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const postSchema = new Schema({
    // _id: ObjectId,
    users_id: { type: ObjectId, ref: 'users', },
    andress: String,
    business_name: String,
    image: String,
    quantity: Number,
    title: String,
    career_id: ObjectId,
    payform_id: ObjectId,
    experience_id: ObjectId,
    acedemic_id: ObjectId,
    worktype_id: ObjectId,
    describe: String,
    age_min: Number,
    age_max: Number,
    wage_min: Number,
    wage_max: Number,
    status_id: ObjectId,
})

module.exports = mongoose.model.post || mongoose.model('post', postSchema);