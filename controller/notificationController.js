const notificationModel = require('../modules/notification');

exports.insert = async (receiver_id, sender_id, post_id, cv_id, typeNotification) => {
    try {
        const data = new notificationModel({
            receiver_id, sender_id, post_id, cv_id, typeNotification
        });
        await data.save();
    } catch (error) {
        console.log(error);
    }
}

exports.getById = async (_id) => {
    try {
        let data = await notificationModel.find({ receiver_id : _id }).populate('post_id').populate('cv_id').populate('sender_id');
        return data;
    } catch (error) {
        console.log(error);
    }
}