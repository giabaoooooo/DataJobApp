const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const cvSchema = new Schema({
    // _id: ObjectId,
    current_andress: String,
    title: String,
    experience_id:{
        type: String,
        ref: 'experience',
    },
    career_id: {
        type: ObjectId,
        ref: 'career',
    },
    acedemic_id: {
        type: String,
        ref: 'acedemic',
    },
    worktype_id: {
        type: String,
        ref: 'worktype',
    },
    payform_id: {
        type: String,
        ref: 'payform',
    },
    describe: String,
    user_id: {
        type: String,
        ref: 'user',
    }
});

module.exports = mongoose.model.cvs || mongoose.model('cvs', cvSchema);