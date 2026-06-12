const multer = require('multer');

// const profileStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/profile');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

const documentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/documents');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// const uploadProfile = multer({ storage: profileStorage });
const uploadDocument = multer({ storage: documentStorage });

module.exports = uploadDocument;