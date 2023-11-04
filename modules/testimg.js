const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const testimgSchema = new Schema({
    // _id: ObjectId,
    name: String,
    img: String,
    cloudinary_id: String,
})

module.exports = mongoose.model.testimg || mongoose.model('testimg', testimgSchema);