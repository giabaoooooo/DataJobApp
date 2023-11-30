const postModel = require('../modules/post');

exports.insert = async function insert(users_id, businessName, address, image, title, quantity, gender, career_id, workType_id, payForm_id, wageMin, wageMax, describe, ageMin, ageMax, academic_id, experience_id, status_id) {
    try {
        let post = new postModel({ users_id, businessName, address, image, title, quantity, gender, career_id, workType_id, payForm_id, wageMin, wageMax, describe, ageMin, ageMax, academic_id, experience_id, status_id });
        await post.save();
        console.log("Post success..");
    } catch (error) {
        console.log(error);
    }
}

exports.changeStatus = async (_id, status) => {
    try {
        await postModel.findByIdAndUpdate(_id, { status_id: status });
        console.log(`Update status success for report ${_id}`);
    } catch (error) {
        console.log(error);
    }
}

exports.getById = async (_id) => {
    try {
        let posts = await postModel.find({ _id });
        return posts;
    } catch (error) {
        console.log(error);
    }
}

exports.getByIsDisplayStatus = async (id) => {
    try {
        let posts = await postModel.find({ status_id: "65447e2296c02dcf49965471", users_id : id});
        return posts;
    } catch (error) {
        console.log(error);
    }
}

exports.getByWaitingStatus = async (id) => {
    try {
        let posts = await postModel.find({ status_id: "65423efa3f8e779b5ec14e51", users_id: id });
        return posts;
    } catch (error) {
        console.log(error);
    }
}

exports.getByDeniedStatus = async (id) => {
    try {
        let posts = await postModel.find({ status_id: "65447e3996c02dcf49965472", users_id: id });
        return posts;
    } catch (error) {
        console.log(error);
    }
}

exports.searchByKey = async (key) => {
    try {
        console.log(key);
        if (key) {
            let posts = await postModel.find({ title: { $regex: key } });
            return posts;
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

