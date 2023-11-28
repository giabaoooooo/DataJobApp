const applyModel = require('../modules/apply');

exports.insert = async (post_id, cv_id) => {
    try {
        const data = new applyModel({
            post_id,
            cv_id
        });
        await data.save();
    } catch (error) {
        console.log(error);
    }
}