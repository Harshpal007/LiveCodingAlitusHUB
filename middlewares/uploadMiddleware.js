const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null , file.fieldname + '-' +  Date.now() +path.extname(file.originalname));

    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req,file,cb){
        const fileTypes = /jpeg|jpg|png|gif/ ;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
    
    if(mimetype && extname){
        return cb(null,true);
    }
    else{
        cb(new Error('Only images are allowed'));
    }
}
});

module.exports = upload;