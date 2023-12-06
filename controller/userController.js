const User = require('../modules/user');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('598708373288-vlbap93edc5r144q7cnealcu8vls110o.apps.googleusercontent.com')

// SignIn with Google
async function checkGoogleID(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '598708373288-vlbap93edc5r144q7cnealcu8vls110o.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();

        //Thông tin account
        const userId = payload['sub'];
        const email = payload['email'];
        const name = payload['name'];
        const picture = payload['picture'];

        const existingUser = await User.findOne({ googleId: userId });
        
        if (existingUser) {
            return existingUser;
        } else {
            const data = new User({
                googleId: userId,
                displayName: name,
                email: email,
                photo: picture,
                birthDay: "null",
                address: "null",
                phone: 0,
                gender: "null",
                status: true,
            });
            await data.save();
            return data;
        }
    } catch (error) {
        console.log("err :" + error);
    }
};

// SignIn with Phone Number
async function checkPhoneNumber(phoneNumber) {
    try {
        const existingUser = await User.findOne({ phone : phoneNumber });

        if (existingUser) {
            return existingUser;
        } else {
            const data = new User({
                googleId: "null",
                displayName: "No Name",
                email: "null",
                photo: "https://th.bing.com/th/id/R.0e2d903d47176e8d432d64aed96ff50c?rik=0%2f8IX%2fuxigpPFA&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2009%2f11%2fimages-of-people-user-icon-transparent_85912.png&ehk=t7ZBMJwVRTqq14tYXsK3EF%2b83cLuMJg9Kh6P7BoLp6E%3d&risl=&pid=ImgRaw&r=0",
                birthDay: "null",
                address: "null",
                phone: phoneNumber,
                gender: "null",
                status: true,
            });
            await data.save();
            return data;
        } 
    } catch (error) {
        console.log("err : " + error);
    }
}

module.exports = { checkGoogleID, checkPhoneNumber };