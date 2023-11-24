const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // cb(null, uniqueSuffix + '-' + file.originalname);
        cb(null, Date.now() + '-' + file.originalname);
    }
    
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        //reject file
        cb({ message: 'Unsupported file format' }, false);
    }
}


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024  //5MB
    },
    fileFilter: fileFilter
})

module.exports = upload;
// module.exports = multer({ storage: storage });