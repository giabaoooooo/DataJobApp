const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const cvSchema = new Schema({
    _id: ObjectId,
    current_andress: String,
    experience:{
        type: ObjectId,
        ref: 'experience',
    },
    career: {
        type: ObjectId,
        ref: 'career',
    },
    acedemic: {
        type: ObjectId,
        ref: 'acedemic',
    },
    work_type: {
        type: ObjectId,
        ref: 'worktype',
    },
    pay_form: {
        type: ObjectId,
        ref: 'payform',
    },
    instroduce: String,
    user: {
        type: ObjectId,
        ref: 'user',
    }
});

module.exports = mongoose.model.cvs || mongoose.model('cv', cvSchema);