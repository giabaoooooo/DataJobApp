const notificationModel = require('../modules/notification');
const userModel = require('../modules/user');
const http = require('https');

var admin = require("firebase-admin");

var serviceAccount = require("../part-time-job-e95a4-firebase-adminsdk-1oexn-f3fb4fe50c.json");
// const  firebase  = require('@react-native-firebase/messaging');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.insert = async (receiver_id, sender_id, post_id, cv_id, category, seen) => {
    try {
        const data = new notificationModel({
            receiver_id: receiver_id,
            sender_id: sender_id,
            post_id: post_id,
            cv_id: cv_id,
            category: category,
            seen: seen,
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
    const idReceiver = data.receiver_id;
    const idSender = data.sender_id;
    const category = data.category;
    try {
        const result = await userModel.find({ _id: idReceiver });
        const dataSender = await userModel.find({ _id: idSender });
        const messagingToken = result[0].messagingToken;

        const data0 = JSON.stringify({
            "registration_ids": [
                messagingToken,
            ],
            "notification": {
                'body': dataSender[0].displayName + ' đã ứng tuyển tin của bạn',
                'title': 'Đơn ứng tuyển mới',
                'color': "#337BFF",
                'priority': "high",
                'sound': "default",
                'vibrateTimingsMillis': [200, 500, 800],
                'imageUrl': dataSender[0].photo,
            },
            "data": {
                'category': category,
                'role': result[0].role,
            }
        });

        const data01 = JSON.stringify({
            "registration_ids": [
                messagingToken,
            ],
            "notification": {
                'body': dataSender[0].displayName + ' đã phản hồi lại đơn ứng tuyển của bạn',
                'title': 'Phản hồi từ nhà tuyển dụng',
                'color': "#337BFF",
                'priority': "high",
                'sound': "default",
                'vibrateTimingsMillis': [200, 500, 800],
                'imageUrl': dataSender[0].photo,
            },
            "data": {
                'category': category,
                'role': result[0].role,
            }
        });

        const data11 = JSON.stringify({
            "registration_ids": [
                messagingToken,
            ],
            "notification": {
                'body': dataSender[0].displayName + ' đã phản hồi lại yêu cầu của bạn',
                'title': 'Phản hồi từ ứng viên',
                'color': "#337BFF",
                'priority': "high",
                'sound': "default",
                'vibrateTimingsMillis': [200, 500, 800],
                'imageUrl': dataSender[0].photo,
            },
            "data": {
                'category': category,
                'role': result[0].role,
            }
        });

        const data2 = JSON.stringify({
            "registration_ids": [
                messagingToken,
            ],
            "notification": {
                'body': dataSender[0].displayName + ' muốn thương lượng mức lương với bạn',
                'title': 'Phản hồi từ nhà tuyển dụng',
                'color': "#337BFF",
                'priority': "high",
                'sound': "default",
                'vibrateTimingsMillis': [200, 500, 800],
                'imageUrl': dataSender[0].photo,
            },
            "data": {
                'category': category,
                'role': result[0].role,
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
        if (category == 0) {
            req.write(data0);
        } else if (category == 1 && result[0].role == 0) {
            req.write(data01);
        } else if (category == 1 && result[0].role == 1) {
            req.write(data11);
        } else {
            req.write(data2);
        }
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