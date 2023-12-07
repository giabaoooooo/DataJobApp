const userModel = require('../modules/user');

async function getAll() {
    try {
        let user = await userModel.find({});
        return user;
    } catch (error) {
        console.log("Error in getAll():", error);
    }
}

async function check(id) {
    try {
        console.log("id : " + id);
        let user = await userModel.findOne({ googleId: id });
        return user;
    } catch (error) {
        console.log("Error in getAll():", error);
    }
}


  
  



module.exports = { getAll, check }