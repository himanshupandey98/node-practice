
const multer = require('multer');
const fs = require('fs');

const directory = 'storage/project';
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, directory);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const projectUpload = multer({ storage: storage }).single('project_image');

module.exports = {
    projectUpload: projectUpload,
};

