const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const careerSchema = new Schema({
    // _id : ObjectId,
<<<<<<< HEAD
    c_title: String,
    image: String
=======
    title: String,
    image: String,
>>>>>>> origin/VanChuc
});
module.exports = mongoose.model.careers || mongoose.model('career', careerSchema);