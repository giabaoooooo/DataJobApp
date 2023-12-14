const notificationModel = require('../modules/notification');

exports.insert = async (receiver_id, sender_id, post_id, cv_id, category, seen) => {
    try {
        const data = new notificationModel({
            receiver_id: receiver_id,
            sender_id: sender_id,
            post_id: post_id,
            cv_id: cv_id,
            category: category,
            seen: seen,
        });
        await data.save();
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.getById = async (_id) => {
    try {
        let data = await notificationModel.find({ receiver_id: _id }).populate('post_id').populate('sender_id').populate('receiver_id')
            .populate({
                path: 'cv_id',
                populate: {
                    path: 'user_id',
                    model: 'user'
                }
            })
        data.reverse();
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.getByIdNoSeen = async (_id) => {
    try {
        let data = await notificationModel.find({ receiver_id: _id, seen: 0 })
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.updateSeen = async (id) => {
    try {
        const data = await notificationModel.findOneAndUpdate(
            { _id: id }, {
            seen: 1
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}