const express = require('express');
const router = express.Router();

const ApiController = require('../controllers/apiController');

// Get fies
router.get('/getFiles', ApiController.getFiles);

// get thirdParty files
router.get('/thirdParty/:path/t/:type', ApiController.thirdParty);

// get images
router.get('/images/:path/t/:type/d/:width/:height/m/:mime1/:mime2/:key', ApiController.serveImages);

// get files
router.get('/files/:path/t/:type/m/:mime1/:mime2/s/:size/:key', ApiController.serveFiles);

module.exports = router;
