const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const experienceSchema = new Schema({
    _id: ObjectId,
    title: String,
});
module.exports = mongoose.model.experiences || mongoose.model('experience', experienceSchema);