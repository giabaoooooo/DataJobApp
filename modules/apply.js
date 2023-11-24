const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const moment = require('moment');
const currentTime = new Date();
const time = moment(currentTime).format('HH:mm:ss DD/MM/YYYY');
const applySchema = new Schema({
    // _id: ObjectId,
    post_id: {
        type: String,
        ref: 'post',
    },
    cv: {
        type: String,
        ref: 'cvs',
    },
    time: { type: String, default: time },
})


module.exports = mongoose.model.applies || mongoose.model('apply', applySchema);