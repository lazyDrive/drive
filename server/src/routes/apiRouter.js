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

  // var walkSync = function(dir, filelist) {
  //   var fs = fs || require('fs'),
  //       files = fs.readdirSync(dir);
  //   filelist = filelist || [];
  //   dir =
  //
  //   files.forEach(function(file) {
  //     if (fs.statSync(dir + file).isDirectory()) {
  //       filelist = walkSync(dir + file + '/', filelist);
  //     }
  //     else {
  //       filelist.push(file);
  //     }
  //   });
  //   return filelist;
  // };
  //
  //   var files = walkSync(uploadFolder)

  var files = [];


  // function dataFiles(imgUrl, imgLazyUrl) {
  //    this.imgUrl = imgUrl,
  //    this.name = 'Image' + Math.floor((Math.random() * 100) + 1),
  //    this.imgLazyUrl = imgLazyUrl,
  //    this.id = Math.floor((Math.random() * 100000000) + 1),
  //    this.type = 'files',
  //    this.color = colors[Math.floor((Math.random() * 8) + 1)]
  //  }

  fs.readdirSync(uploadFolder).forEach(file => {

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
      content.path = 'http://localhost:3344' + dir + file;

      const dimensions = sizeOf(uploadFolder + file);
      content.dimensions.height = dimensions.height;
      content.dimensions.width = dimensions.width;
      content.imgLazyUrl = 'http://localhost:3344' + dir + file;
      content.imgUrl = 'http://localhost:3344' + dir + file;
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
      // shasum.update(content.imgUrl);
      // content.id = shasum.digest('hex');
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
router.post('/ninjas', (req, res, next) => {
  ApiModel.create(req.body).then((ninja) => {
    res.send(ninja);
  }).catch(next);
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
