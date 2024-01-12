const notificationModel = require('../modules/notification');
const userModel = require('../modules/user');
const http = require('https');

var admin = require("firebase-admin");

var serviceAccount = require("../part-time-job-e95a4-firebase-adminsdk-1oexn-f3fb4fe50c.json");
// const  firebase  = require('@react-native-firebase/messaging');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.insert = async (receiver_id, sender_id, post_id, cv_id, category, seen, messagingToken) => {
    try {
        const data = new notificationModel({
            receiver_id: receiver_id,
            sender_id: sender_id,
            post_id: post_id,
            cv_id: cv_id,
            category: category,
            seen: seen,
            messagingToken: messagingToken,
        });
        await data.save();
        sendNotification(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

const sendNotification = async (data) => {
    // console.log(data);
    // const token = "e4E6pkKXQa2kyfYS8k_FM4:APA91bH96bVHymHUgPQbsw9e92Ptk6D1TvebB4u2VnmuGliMQj9iLmSbyylaE1VKcRkpwDamj_HVjRxKuF_SRJgQdwrdM1U6pmeCn3mM6KCf4ej_1vPDk6WdI9HNWVo_Cdf0nBxv38vS"
    // if (data.category == 0) {
    //     admin.messaging().send({
    //         token: "",
    //         data: {
    //             customData: data.category + "",
    //             id: '1',
    //             ad: data.sender_id.displayName + "",
    //             subTitle: "Nodejs"
    //         }, 
    //         android: {
    //             notification: {
    //                 body: data.sender_id.displayName + 'Đã ứng tuyển',
    //                 title: 'Đơn ứng tuyển mới',
    //                 color: "#fff566",
    //                 priority: "high",
    //                 sound: "default",
    //                 vibrateTimingsMillis: [200, 500, 800],
    //                 imageUrl: data.sender_id.photo,
    //             }
    //         }
    //     }).then((msg) => {
    //         console.log(msg);
    //     })
    // }
    const id = data.receiver_id; 
    try {
        const result = await userModel.find({ _id: id }).populate('user_id'); 
        console.log("result: ", result);
        

        const messagingToken = result.messagingToken;
        const data = JSON.stringify({
            "registration_ids": [
                "eJVD_nLxTt-6VD0-feAPne:APA91bFn1oyHAU8Kr6aJj6iAnIhrHvOriAHh8nOXUhzCDpm2AfflqAvip7TJwM6tPLAyMN7Glk4Mm5acvFoDB9f1inQrhO8vCuNTwfXqJnXBijd1QuDPKs4j5l69pNAHI_duZHjO3Psk"
            ],
            "notification": {
                "title": "Thông báo",
                "body": "abc"
            }
        });
        const options = {
            hostname: 'fcm.googleapis.com',
            path: '/fcm/send',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'key=AAAAi2XMxyg:APA91bH-FRApbC_AHFGwqjofdkWE2xKIFfHmwL7K93WuhP34Um8WjkfnD48BObq5oEmv7yL5mURLBTnFSAgrwKSkIulpDfoJYuDxmSBGUy2ucIKEzUp_3Vzh9f2bhayOgCFZpH5TvMUi' // Thêm khóa xác thực của bạn ở đây
            }
          };
          
          const req = http.request(options, res => {
            let responseData = '';
          
            res.on('data', chunk => {
              responseData += chunk;
            });
          
            res.on('end', () => {
              console.log('Phản hồi từ server:', responseData);
            });
          });
          
          req.on('error', error => {
            console.error('Lỗi khi gửi yêu cầu:', error);
          });
          
          // Gửi dữ liệu trong yêu cầu
          req.write(data);
          req.end();
    } catch (error) {
        console.log(error);
    }
    
}

exports.getById = async (_id) => {
    try {
        let data = await notificationModel.find({ receiver_id: _id }).populate('post_id').populate('sender_id').populate('receiver_id')
            .populate({
                path: 'cv_id',
                populate: {
                    path: 'user_id',
                    model: 'user'
                }
            })
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.getByIdNoSeen = async (_id) => {
    try {
        let data = await notificationModel.find({ receiver_id: _id, seen: 0 })
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.updateSeen = async (id) => {
    try {
        const data = await notificationModel.findOneAndUpdate(
            { _id: id }, {
            seen: 1
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}