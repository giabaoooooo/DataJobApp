const User = require('../modules/user');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('598708373288-vlbap93edc5r144q7cnealcu8vls110o.apps.googleusercontent.com')

// Check with Google
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
            const data = {
                googleId: userId,
                displayName: name,
                email: email,
                photo: picture,
                birthDay: "",
                address: "",
                phone: null,
                gender: "",
                role: null,
                favoriteCareers : [],
                status: false,
            };
            return data;
        }
    } catch (error) {
        console.log("err :" + error);
    }
};
// SignIn with Google
async function googleSignIn(token) {
    try {
        const existingUser = await User.findOne({ googleId: token?.inputs?.googleId });

        if (existingUser) {
            return existingUser;
        } else {
            const data = new User({
                googleId: token?.inputs?.googleId,
                displayName: token?.inputs?.displayName,
                email: token?.inputs?.email,
                photo: token?.inputs?.photo,
                birthDay: token?.inputs?.birthDay,
                address: token?.inputs?.address,
                phone: token?.inputs?.phone,
                gender: token?.inputs?.gender,
                role: token?.inputs?.role,
                favoriteCareers: token?.inputs?.favoriteCareers,
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
async function checkPhoneNumber(displayName, birthDay, address, phone, gender,) {
    try {
        console.log(phone, displayName);
        const existingUser = await User.findOne({ phone: phone });

        if (existingUser) {
            console.log(existingUser);
            return existingUser;
        } else {
            const data = new User({
                googleId: "null",
                displayName: displayName,
                email: "null",
                photo: "https://th.bing.com/th/id/R.0e2d903d47176e8d432d64aed96ff50c?rik=0%2f8IX%2fuxigpPFA&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2009%2f11%2fimages-of-people-user-icon-transparent_85912.png&ehk=t7ZBMJwVRTqq14tYXsK3EF%2b83cLuMJg9Kh6P7BoLp6E%3d&risl=&pid=ImgRaw&r=0",
                birthDay: birthDay,
                address: address,
                phone: phone,
                gender: gender,
                status: true,
            });
            await data.save();
            return data;
        } 
    } catch (error) {
        console.log("err : " + error);
    }
}

module.exports = { checkGoogleID, checkPhoneNumber, googleSignIn };