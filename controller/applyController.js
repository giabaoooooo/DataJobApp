const applyModel = require('../modules/apply');

exports.add = async (user_id, post_id) => {
    try {
        const data = new applyModel({
            user_id,
            post_id
        });
        await data.save();
        console.log("Thêm mới thành công");
        return data;
    } catch (error) {
        console.log(error);
    }
}