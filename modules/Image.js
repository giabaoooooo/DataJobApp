const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    url: String,
    filename: String,
    createdAt: { type: Date, default: Date.now }
})
const ImageModel = mongoose.model('Image', imageSchema);


module.exports = ImageModel;