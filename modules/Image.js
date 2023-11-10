const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    imgUrl: {
        type: String,
        required: true
    },
    id: String,
})
const ImageModel = mongoose.model('Image', imageSchema);


module.exports = ImageModel;