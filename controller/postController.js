const postModel = require('../modules/post');

exports.insert = async function insert(users_id, businessName, address, image, title, quantity, gender, career_id, workType_id, payForm_id, wageMin, wageMax, describe, ageMin, ageMax, academic_id, experience_id, status_id) {
    try {
        let post = new postModel({ users_id, businessName, address, image, title, quantity, gender, career_id, workType_id, payForm_id, wageMin, wageMax, describe, ageMin, ageMax, academic_id, experience_id, status_id });
        post.wageMin = Number(wageMin.replace(/\./g, ''));
        post.wageMax = Number(wageMax.replace(/\./g, ''));
        await post.save();
    } catch (error) {
        console.log(error);
    }
}

exports.update = async (_id, users_id, businessName, address, image, title, quantity, gender, career_id, workType_id, payForm_id, wageMin, wageMax, describe, ageMin, ageMax, academic_id, experience_id) => {
    try {
        const data = await postModel.findOneAndUpdate(
            { _id: _id },
            {
                users_id: users_id,
                businessName: businessName,
                address: address,
                image: image,
                title: title,
                quantity: quantity,
                gender: gender,
                career_id: career_id,
                workType_id: workType_id,
                payForm_id: payForm_id,
                wageMin: Number(wageMin.replace(/\./g, '')),
                wageMax: Number(wageMax.replace(/\./g, '')),
                describe: describe,
                ageMin: ageMin,
                ageMax: ageMax,
                academic_id: academic_id,
                experience_id: experience_id,
            },
            { new: true } // Tùy chọn để trả về bản ghi đã được cập nhật
        );
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.changeStatus = async (_id, status) => {
    try {
        const currentDate = new Date(); // Lấy thời gian hiện tại
        const updatedData = {
            status_id: status,
            date: currentDate.toISOString().slice(0, 10),
            time: currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds(),
        };
        console.log(updatedData.time);
        await postModel.findByIdAndUpdate(_id, updatedData);
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
        let posts = await postModel.find({ status_id: "65447e2296c02dcf49965471", users_id: id });
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

exports.getSuggestion = async (data) => {
    try {
        const posts = [];
        if (data && data.length > 0) {
            for (const career of data) {
                const foundPosts = await postModel.find({ career_id: career, status_id: '65447e2296c02dcf49965471' })
                    .populate('users_id').populate('career_id').populate('payForm_id').populate('experience_id').populate('academic_id').populate('workType_id').populate('status_id');
                posts.push(...foundPosts);
            }
        }
        return posts;
    } catch (error) {
        console.log(error);
        return [];
    }
}

exports.searchByKey = async (key) => {
    try {
        if (key) {
            let posts = await postModel.find({
                status_id: '65447e2296c02dcf49965471',
                $or: [
                    { title: { $regex: key } },
                    { address: { $regex: key } },
                    { businessName: { $regex: key } },
                ]
            }).populate('users_id').populate('career_id').populate('payForm_id').populate('experience_id').populate('academic_id').populate('workType_id').populate('status_id');
            return posts;
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

exports.filter = async (key) => {
    try {
        let filter = {};
        if (key?.filter?.address) {
            filter.address = { $regex: key.filter.address };
        }
        if (key?.filter?.gender_id) {
            filter.gender_id = { $in: key.filter.gender_id };
        }
        if (key?.filter?.career_id) {
            filter.career_id = { $in: key.filter.career_id };
        }
        if (key?.filter?.workType_id) {
            filter.workType_id = { $in: key.filter.workType_id };
        }
        if (key?.filter?.payForm_id === "655de22b9a5b0ffa7ffd5132") {
            if (key?.filter?.wageMin) {
                filter.wageMin = { $gte: parseInt(key.filter.wageMin) * 1000 };
            }
            if (key?.filter?.wageMax) {
                filter.wageMax = { $lte: parseInt(key.filter.wageMax) * 1000 };
            }
        } else {
            if (key?.filter?.wageMin) {
                filter.wageMin = { $gte: parseInt(key.filter.wageMin) * 100000 };
            }
            if (key?.filter?.wageMax) {
                filter.wageMax = { $lte: parseInt(key.filter.wageMax) * 100000 };
            }
        }
        if (key?.filter?.academic_id) {
            filter.academic_id = { $regex: key.filter.academic_id };
        }
        if (key?.filter?.experience_id) {
            filter.experience_id = { $regex: key.filter.experience_id };
        }
        let data = await postModel.find(filter);
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

