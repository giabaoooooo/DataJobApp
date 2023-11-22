const postModel = require('../modules/post');

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
        let posts = await postModel.findOne({ _id });
        return posts;
    } catch (error) {
        console.log(error);
    }
}

