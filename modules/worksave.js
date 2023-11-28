const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const workSaveSchema = new Schema({
    _id: ObjectId,
    user_id: {
        type: String,
        ref: 'user',
    },
    post_id: {
        type: String,
        ref: 'post',
    },
});

module.exports = mongoose.model.worksave || mongoose.model('worksave', workSaveSchema);