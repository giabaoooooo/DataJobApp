const adminModules = require('../modules/admin');

exports.login= async (username, password) => {
    const admin = await adminModules.find(admin => admin.username == username && admin.password == password );
    if(!admin){
        return null;
    }
    return admin;
}