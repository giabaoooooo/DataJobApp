const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const acedemicSchema = new Schema({
    _id: ObjectId,
    a_title: String,
});
module.exports = mongoose.model.acedemics || mongoose.model('acedemic', acedemicSchema);