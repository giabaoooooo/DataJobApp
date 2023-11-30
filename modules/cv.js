const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const cvSchema = new Schema({
    // _id: ObjectId,
    title: String,
    name: String,
    address: String,
    experience:{
        type: String,
    },
    acedemic_id: {
        type: String,
        ref: 'acedemic',
    },
    year: String,
    email: String,
    phone: String,
    introduce: String,
    gender: {
        type: String,
        ref: 'gender'
    },
    user_id: {
        type: String,
        ref: 'user',
    }
});

module.exports = mongoose.model.cvs || mongoose.model('cvs', cvSchema);