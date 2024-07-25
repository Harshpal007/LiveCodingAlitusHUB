const express = require('express');

const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const imageController = require('../controllers/uploadController');

router.post('/upload', upload.single('image'),imageController.uploadImage);

module.exports = router;