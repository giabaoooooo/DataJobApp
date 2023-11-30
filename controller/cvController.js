var cvModules = require('../modules/cv');

exports.insert = async (title, user_id, name, phone, year, email, address, experience, introduce, gender) => {
    try {
        const data = new cvModules({ title, user_id, name, phone, year, email, address, experience, introduce, gender });
        await data.save();
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.getMyCV = async (id) => {
    try {
        var data = await cvModules.find({ user_id: id }).populate('acedemic_id').populate('user_id');
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.getMyNewCV = async (id) => {
    try {
        var data = await cvModules.findOne({ user_id: id }).populate('acedemic_id').populate('user_id');
        console.log("cv : ", data);
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
