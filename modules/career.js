const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const careerSchema = new Schema({
    c_title: String,
    image: String
});
module.exports = mongoose.model.careers || mongoose.model('career', careerSchema);