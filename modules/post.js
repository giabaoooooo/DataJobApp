const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const currentTime = new Date();

const postSchema = new Schema({
<<<<<<< HEAD
    users_id: { type: String, ref: 'user', },
=======
    users_id: { type: String, ref: 'user' },
>>>>>>> VanChuc
    businessName: String,
    address: String,
    image: Array,
    title: String,
    quantity: Number,
    gender: String,
    career_id: { type: String, ref: 'career' },
    payForm_id: { type: String, ref: 'payform' },
    experience_id: { type: String, ref: 'experience' },
    academic_id: { type: String, ref: 'acedemic' },
    workType_id: { type: String, ref: 'worktype' },
    describe: String,
    ageMin: Number,
    ageMax: Number,
    wageMin: Number,
    wageMax: Number,
<<<<<<< HEAD
    status_id: {type: String, ref: 'status',},
    date: { type: Date, default: Date.now() },
    time: { type: String, default: currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds() },
})
=======
    status_id: { type: String, ref: 'status' },
    date: { type: Date },
    time: { type: String }
});

// Pre-save middleware to format date and time
postSchema.pre('save', function(next) {
    this.date = new Date().toISOString().slice(0, 10);
    this.time = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
    next();
});
>>>>>>> VanChuc

module.exports = mongoose.model.post || mongoose.model('post', postSchema);