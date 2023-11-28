const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const academicSchema = new Schema({
    _id: ObjectId,
    a_title: String,
});
module.exports = mongoose.model.acedemics || mongoose.model('acedemic', academicSchema);