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
        const data = await applyModel.findOneAndUpdate(
            { _id: id?.id }, {
            status: 4,
            bargain_salary: id?.bargain_salary,
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

exports.findByIdCondition = async (id) => {
    try {
        console.log(id);
        let data = await applyModel.find({ received_id: id });
        console.log("đáas : ",data);
        return data;
    } catch (error) {
        console.log(error);
    }

}
exports.JobFindinguser = async () => {
    try {
        let data = await applyModel.find({ status_id: 3 });
        return data;
    } catch (error) {
        console.log(error);
    }

}

exports.getMonthlyStats = async (year) => {
    let numericYear = parseInt(year) + 1;
    try {
        let monthlyStats = await applyModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(year, 0, 1),
                        $lt: new Date(numericYear, 0, 1)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$date" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        return monthlyStats.map(entry => ({ month: entry._id + `/${year}`, count: entry.count }));
    } catch (error) {
        console.log("Lỗi trong getMonthlyStats():", error);
    }
}