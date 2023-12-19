const applyModel = require('../modules/apply');

exports.insert = async (sender_id, receiver_id, post_id, cv_id, salary) => {
    try {
        const data = new applyModel({
            user_id: sender_id,
            receiver_id: receiver_id,
            post_id: post_id,
            cv_id: cv_id,
            status: 0,
            salary: salary,
            bargain_salary: 0,
            feedback: '',
        });
        data.salary = Number(salary.replace(/\./g, ''));
        await data.save();
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.update = async (id) => {
    try {
        const data = await applyModel.findOneAndUpdate(
            { _id: id }, {
            status: 1,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}
exports.updateAccept = async (id) => {
    try {
        const data = await applyModel.findOneAndUpdate(
            { _id: id }, {
            status: 3,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}
exports.updateReject = async (id) => {
    try {
        const data = await applyModel.findOneAndUpdate(
            { _id: id?.id }, {
            status: 2,
            feedback: id?.feedback,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.updateBargain = async (id) => {
    try {
        const temp = id?.bargain_salary;
        const bargain = Number(temp.replace(/\./g, ''));
        const data = await applyModel.findOneAndUpdate(
            { _id: id?.id }, {
            status: 4,
            bargain_salary: bargain,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.getByIsUnReadStatus = async (id) => {
    try {
        let posts = await applyModel.find({ status_id: 0, received_id: id });
        return posts;
    } catch (error) {
        console.log(error);
    }
}

exports.getByWaitingStatus = async (id) => {
    try {
        let posts = await applyModel.find({ status_id: 1, received_id: id });
        return posts;
    } catch (error) {
        console.log(error);
    }
}

exports.getByRejectStatus = async (id) => {
    try {
        let posts = await applyModel.find({ status_id: 2, received_id: id });
        return posts;
    } catch (error) {
        console.log(error);
    }
}
exports.getByAcceptStatus = async (id) => {
    try {
        let posts = await applyModel.find({ status_id: 3, received_id: id });
        return posts;
    } catch (error) {
        console.log(error);
    }
}

exports.getByBargainStatus = async (id) => {
    try {
        let posts = await applyModel.find({ status_id: 4, received_id: id });
        return posts;
    } catch (error) {
        console.log(error);
    }
}