const userModel = require('../modules/user');

async function getAll() {
    try {
        let users = await userModel.find({});
        return users;
    } catch (error) {
        console.log("Error in getAll():", error);
    }
}

async function check(id) {
    try {
        console.log("id : " + id);
        let users = await userModel.findOne({ googleId: id });
        return users;
    } catch (error) {
        console.log("Error in getAll():", error);
    }
}


  
  



module.exports = { getAll, check }