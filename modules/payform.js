const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const payformSchema = new Schema({
    _id: ObjectId,
    title: String,
});
module.exports = mongoose.model.payforms || mongoose.model('payform', payformSchema);