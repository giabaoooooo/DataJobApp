const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const cvSchema = new Schema({
    // _id: ObjectId,
    title: String,
    name: String,
    phone: String,
    gender_id: {
        type: String,
        ref: 'gender'
    },
    email: String,
    career_id: {
        type: String,
        ref: 'career'
    },
    address: String,
    experience_id:{
        type: String,
        ref: 'experience'
    },
    academic_id: {
        type: String,
        ref: 'acedemic',
    },
    year: String,
    introduce: String,
    user_id: {
        type: String,
        ref: 'user',
    }
});

module.exports = mongoose.model.cvs || mongoose.model('cvs', cvSchema);