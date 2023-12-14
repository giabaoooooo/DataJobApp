var cvModules = require('../modules/cv');

exports.insert = async (title, user_id, career_id, name, phone, year, email, address, experience_id, introduce, gender_id, academic_id) => {
    try {
        const data = new cvModules({ title, user_id, career_id, name, phone, year, email, address, experience_id, introduce, gender_id, academic_id });
        await data.save();
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.getMyCV = async (id) => {
    try {
        var data = await cvModules.find({ user_id: id?.id }).populate('academic_id').populate('experience_id').populate('gender_id').populate('career_id').populate('user_id');
        return data;
    } catch (error) {
        console.log(error);
    }
}


exports.getMyCVByCareer = async (id) => {
    try {
        var data = await cvModules.find({ user_id: id?.data?.userId, career_id: id?.data?.career_id }).populate('academic_id').populate('experience_id').populate('gender_id').populate('career_id').populate('user_id');
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.first = async (id) => {
    try {
        var data = await cvModules.find({ user_id: id, career_id: '6554b9b322054e51b8327165' }).populate('academic_id').populate('user_id');
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.update = async (title, _id, career_id, name, phone, year, email, address, experience_id, introduce, gender_id, academic_id) => {
    try {
        const data = await cvModules.findOneAndUpdate(
            { _id: _id },
            {
                title: title,
                career_id: career_id,
                name: name,
                phone: phone,
                year: year,
                email: email,
                address: address,
                experience_id: experience_id,
                introduce: introduce,
                gender_id: gender_id,
                academic_id: academic_id
            },
            { new: true } // Tùy chọn để trả về bản ghi đã được cập nhật
        );        
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.delete = async (id) => {
    try {
        var data = await cvModules.deleteOne({ _id: id });
        return data;
    } catch (error) {
        console.log("cv : ", data);
        return data;
    }
}
