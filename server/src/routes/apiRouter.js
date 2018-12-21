const express = require('express');
const fs = require('fs');
const util = require('util');
const readChunk = require('read-chunk');
const fileType = require('file-type');
var sizeOf = require('image-size');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const router = express.Router();
const ApiModel = require('../models/apiModel');

const uploadFolder = './uploads/';

// Get
router.get('/getFiles', (req, res) => {

  var files = [];

  fs.readdirSync(uploadFolder).forEach(file => {

    var content = {
      'id':'',
      'name':'',
      'type':'',
      'path':'',
      'extension':'',
      'extImg':'',
      'size':'',
      'mime_type':'',
      'created_date':'',
      'imgUrl':'',
      'imgLazyUrl':'',
      'color':'',
      'dimensions':{
        'height':'',
        'width':'',
      },
    };

    var colors = [
      '#4CAF50',
      '#FFC107',
      '#2196F3',
      '#FF5252',
      '#3949AB',
      '#00BCD4',
      '#28a745',
      '#424242',
      '#1976D2'
    ]

    console.log(file);
    content.name = file;

    if(fs.statSync(uploadFolder + file).isDirectory())
    {
      content.type = 'folders';
      content.mime_type = 'directory';

      const dir = uploadFolder.split('.')[1];
      content.path = dir + file;
    }
    else
    {
      content.type = 'files';

      const buffer = readChunk.sync(uploadFolder + file, 0, fileType.minimumBytes);
      const fileInfo  = fileType(buffer)
      content.extension = fileInfo.ext;
      content.mime_type = fileInfo.mime;

      const dir = uploadFolder.split('.')[1];
      content.path =  dir + file;

      const dimensions = sizeOf(uploadFolder + file);
      content.dimensions.height = dimensions.height;
      content.dimensions.width = dimensions.width;
      content.imgLazyUrl = '/api/images/' + Buffer.from(uploadFolder + file).toString('base64') + '/t/' + fileInfo.ext + '/d/200/200/m/' + fileInfo.mime;
      content.imgUrl = '/api/images/' + Buffer.from(uploadFolder + file).toString('base64') + '/t/' + fileInfo.ext + '/d/200/200/m/' + fileInfo.mime;
    }

    dir = uploadFolder.split('.')[1];

    shasum = crypto.createHash('sha1');
    shasum.update(uploadFolder + file);

    content.id = shasum.digest('hex');
    content.color = colors[Math.floor((Math.random() * 8) + 1)];

    const stats = fs.statSync(uploadFolder + file);
    content.size = stats.size;
    const mtime = new Date(util.inspect(stats.mtime));
    content.created_date = mtime;

    const basePath = './thirdParty/';
    const originalPath  = basePath + content.extension + '.svg';

    content.extImg = Buffer.from(originalPath).toString('base64');

    files.push(content);
  });


  for(var i=0; i<7; i++) {

    var content = {
      'id':'',
      'name':'',
      'type':'',
      'path':'',
      'extension':'',
      'size':'',
      'mime_type':'',
      'created_date':'',
      'imgUrl':'',
      'imgLazyUrl':'',
      'color':'',
      'dimensions':{
        'height':'',
        'width':'',
      },
    };

    var n = Math.floor((Math.random() * 17) + 1);

    content.type = 'quick';

    content.imgUrl = `https://picsum.photos/500/300?image=${n * 5 + 10}`;
    content.imgLazyUrl = `https://picsum.photos/10/6?image=${n * 5 + 10}`;
    content.name = 'picsum';

    shasum = crypto.createHash('sha1');
    shasum.update(content.imgLazyUrl + Math.floor((Math.random() * 100000) + 1) );

    content.id = shasum.digest('hex');

    files.push(content)
  }

  res.status(200).send(({
    contents: files,
  }));

});

// Post
router.get('/thirdParty/:path/t/:type', (req, res, next) => {

  const path = Buffer.from(req.params.path, 'base64').toString('ascii');
  const type = req.params.type;

  fs.readFile(path, function (err, content) {
    if (err) {
      res.writeHead(400, {'Content-type':'text/html'})
      res.end("error");
    } else {
      res.writeHead(200,{'Content-Type':'image/svg+xml'});
      res.end(content);
    }
  });
});


// Post
router.get('/images/:path/t/:type/d/:width/:height/m/:mime1/:mime2', (req, res, next) => {

  const height = req.params.height;
  const width = req.params.width;
  const mime1  = req.params.mime1;
  const mime2  = req.params.mime2;
  const path = Buffer.from(req.params.path, 'base64').toString('ascii');
  const type = req.params.type;

  fs.readFile(path, function (err, content) {
    if (err) {
      res.writeHead(400, {'Content-type':'text/html'})
      res.end("error");
    } else {
      res.writeHead(200,{'Content-Type': mime1 + '/' + mime2});
      res.end(content);
    }
  });
});

// Update
router.put('/ninjas/:id', (req, res) => {
  ApiModel.findOneAndUpdate({ _id: req.params.id }, req.body).then(() => {
    ApiModel.findOne({ _id: req.params.id }).then((ninja) => {
      res.send(ninja);
    });
  });
});

// Delete
router.delete('/ninjas/:id', (req, res) => {
  ApiModel.findOneAndDelete({ _id: req.params.id }).then((ninja) => {
    res.send(ninja);
  });
});

module.exports = router;
