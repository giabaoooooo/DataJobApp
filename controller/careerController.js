const { model } = require('mongoose');
const careerModel = require('../modules/career');


exports.getAll = async () => {
    try {
        const data = await careerModel.find();
        console.log("Lấy data thành công");
        return data;
    } catch (error) {
        console.log(error);
    }
}

//thêm mới career
exports.add = async (c_title, image) => {
    try {
        const data = new careerModel({
            c_title,
            image
        });
        await data.save();
        console.log("Thêm mới thành công");
        return data;
    } catch (error) {
        console.log(error);
    }
}

//delete
exports.delete = async (id,res,req) => {
    console.log("hello" + id);
    try {
        const result = await careerModel.deleteOne({ _id: id });

        if (result.deletedCount === 1) {
            console.log("Xóa thành công");
            
        } else {
           console.log("Xóa không thành công");
        }
    } catch (error) {
        console.error(error);
    }
}


//get detail by _id
exports.getDetail = async (id) => {
    try {
        const data = await careerModel.findById({ id });
        return data;
    } catch (error) {
        console.log(error);
    }
}


