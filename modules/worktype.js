const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const worktypeSchema = new Schema({
    _id: ObjectId,
    title: String,
});
module.exports = mongoose.model.worktypes || mongoose.model('worktype', worktypeSchema);