const multer = require('multer');

const general = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const generalUpload = multer({ storage: general }).none();

module.exports = {
   
    generalUpload: generalUpload,
    
};