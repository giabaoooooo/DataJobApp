const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const genderSchema = ({
    _id: ObjectId,
    title: String,
})

module.exports = mongoose.model.gender || mongoose.model('gender', genderSchema);