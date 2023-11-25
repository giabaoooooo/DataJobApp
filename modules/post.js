const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const postSchema = new Schema({
    // _id: ObjectId,
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
})

module.exports = mongoose.model.post || mongoose.model('post', postSchema);