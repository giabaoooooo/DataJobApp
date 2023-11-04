const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const statusSchema = new Schema({
    _id: ObjectId,
    title: String,
})
module.exports = mongoose.model.status || mongoose.model('status', statusSchema);