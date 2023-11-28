const user = require('../modules/user');

//Lấy danh sách users
exports.getAll = async () => {
    try {
        const data = await user.find();
        console.log("Lấy data thành công");
        return data;
    } catch (error) {
        console.log(error);
    }
}

//cập nhật users
exports.update = async (id, name,username,birthday,andress,gender) => {
    try {
        const data = await user.findByIdAndUpdate(id, {
            username,
            name,
            birthday,
            andress,
            gender,
        });
        console.log("Cập nhật users thành công");
        return data;
    } catch (error) {
        console.log(error);
    }
}

//get by id
exports.getDetail = async (_id) => {
    try {
        const data = await user.findById({ _id });
        return data;
    } catch (error) {
        console.log(error);
    }
}