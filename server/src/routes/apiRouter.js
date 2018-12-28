const express = require('express');

const router = express.Router();

const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const ApiController = require('../controllers/apiController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  // } else {
    // cb(null, false);
  // }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
  fileFilter,
});


// Get fies
router.get('/getFiles', ApiController.getFiles);

// get thirdParty files
router.get('/thirdParty/:path/t/:type', ApiController.thirdParty);

// get images
router.get('/images/:path/t/:type/d/:width/:height/m/:mime1/:mime2/:key', ApiController.serveImages);

// get files
router.get('/files/:path/t/:type/m/:mime1/:mime2/s/:size/:key', ApiController.serveFiles);

// Download files
router.get('/download/file/:path', ApiController.downloadFile);

// Upload files
router.post('/upload', checkAuth, upload.single('files'), ApiController.uploadFiles);

module.exports = router;
