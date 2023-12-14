const notificationModel = require('../modules/notification');

exports.insert = async (receiver_id, sender_id, post_id, cv_id, category) => {
    try {
        const data = new notificationModel({
            receiver_id,
            sender_id,
            post_id,
            cv_id,
            category : category,
            seen: 0, 
        });
        await data.save();
    } catch (error) {
        console.log(error);
    }
}

exports.getById = async (_id) => {
    try {
        let data = await notificationModel.find({ receiver_id: _id }).populate('post_id')
            .populate({
                path: 'cv_id',
                populate: {
                    path: 'user_id',
                    model: 'user'
                }
            }).populate('sender_id');
        data.reverse();
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.getByIdNoSeen = async (_id) => {
    try {
        let data = await notificationModel.find({ receiver_id: _id, seen : 0 })
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}