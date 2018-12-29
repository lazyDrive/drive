const util = require('util');
const fs = require('fs');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const sizeOf = require('image-size');
const crypto = require('crypto');
const axios = require('axios');
const Path = require('path');

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require('imagemin-gifsicle');

const Api = require('../models/apiModel');

const uploadFolder = './uploads/';

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

exports.getFiles = (req, res) => {
  const files = [];

  fs.readdirSync(uploadFolder).forEach((file) => {
    const content = {
      id: '',
      name: '',
      type: '',
      path: '',
      extension: '',
      extImg: '',
      size: '',
      mime_type: '',
      created_date: '',
      imgUrl: '',
      imgLazyUrl: '',
      color: '',
      filePath: '',
      dimensions: {
        height: '',
        width: '',
      },
    };

    const colors = [
      '#4CAF50',
      '#FFC107',
      '#2196F3',
      '#FF5252',
      '#3949AB',
      '#00BCD4',
      '#28a745',
      '#424242',
      '#1976D2',
    ];

    content.name = file;
    const stats = fs.statSync(uploadFolder + file);

    if (fs.statSync(uploadFolder + file).isDirectory()) {
      content.type = 'folders';
      content.mime_type = 'directory';

      const dir = uploadFolder.split('.')[1];
      content.path = dir + file;
    } else {
      content.type = 'files';

      const buffer = readChunk.sync(uploadFolder + file, 0, fileType.minimumBytes);
      const fileInfo = fileType(buffer);
      content.extension = fileInfo.ext;
      content.mime_type = fileInfo.mime;

      const dir = uploadFolder.split('.')[1];
      content.path = dir + file;

      const shasum = crypto.createHash('sha1');
      shasum.update(uploadFolder + file + stats.mtime);
      const id = shasum.digest('hex');

      if (fileInfo.mime === 'image/jpeg' || fileInfo.mime === 'image/png' || fileInfo.mime === 'image/jpg') {
        const dimensions = sizeOf(uploadFolder + file);
        content.dimensions.height = dimensions.height;
        content.dimensions.width = dimensions.width;
        content.imgLazyUrl = `/api/images/${Buffer.from(uploadFolder + file).toString('base64')}/t/${fileInfo.ext}/d/200/200/m/${fileInfo.mime}/${id}`;
        content.imgUrl = `/api/images/${Buffer.from(uploadFolder + file).toString('base64')}/t/${fileInfo.ext}/d/200/200/m/${fileInfo.mime}/${id}`;
      } else {
        content.filePath = `/api/files/${Buffer.from(uploadFolder + file).toString('base64')}/t/${fileInfo.ext}/m/${fileInfo.mime}/s/${stats.size}/${id}`;
      }
    }

    dir = uploadFolder.split('.')[1];

    const shasum = crypto.createHash('sha1');
    shasum.update(uploadFolder + file);

    content.id = shasum.digest('hex');
    content.color = colors[Math.floor((Math.random() * 8) + 1)];

    content.size = stats.size;
    const mtime = new Date(util.inspect(stats.mtime));
    content.created_date = mtime;

    const basePath = './thirdParty/';
    const originalPath = `${basePath + content.extension}.svg`;

    content.extImg = Buffer.from(originalPath).toString('base64');

    files.push(content);
  });


  for (let i = 0; i < 7; i += 1) {
    const content = {
      id: '',
      name: '',
      type: '',
      path: '',
      extension: '',
      extImg: '',
      size: '',
      mime_type: '',
      created_date: '',
      imgUrl: '',
      imgLazyUrl: '',
      color: '',
      dimensions: {
        height: '',
        width: '',
      },
    };

    let n = Math.floor((Math.random() * 17) + 1);

    content.type = 'quick';

    content.imgUrl = `https://picsum.photos/500/300?image=${n * 5 + 10}`;
    content.imgLazyUrl = `https://picsum.photos/10/6?image=${n * 5 + 10}`;
    content.name = 'picsum';

    shasum = crypto.createHash('sha1');
    shasum.update(content.imgLazyUrl + Math.floor((Math.random() * 100000) + 1));

    content.id = shasum.digest('hex');

    files.push(content);
  }

  res.status(200).send(({
    contents: files,
  }));
};


exports.thirdParty = (req, res) => {
  const path = Buffer.from(req.params.path, 'base64').toString('ascii');

  fs.readFile(path, (err, content) => {
    if (err) {
      res.writeHead(400, {
        'Content-type': 'text/html'
      });
      res.end('error');
    } else {
      res.writeHead(200, {
        'Content-Type': 'image/svg+xml'
      });
      res.end(content);
    }
  });
};


exports.serveFiles = (req, res) => {
  const path = Buffer.from(req.params.path, 'base64').toString('ascii');
  const mime1 = req.params.mime1;
  const mime2 = req.params.mime2;

  fs.readFile(path, (err) => {
    if (err) {
      res.writeHead(400, {
        'Content-type': 'text/html'
      });
      res.end('error');
    } else {
      const stat = fs.statSync(path);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, {
          start,
          end
        });

        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': `${mime1}/${mime2}`,
        };

        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': `${mime1}/${mime2}`,
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
      }
    }
  });
};

exports.serveImages = (req, res) => {
  const mime1 = req.params.mime1;
  const mime2 = req.params.mime2;
  const path = Buffer.from(req.params.path, 'base64').toString('ascii');

  res.set('Cache-Control', 'public, max-age=31557600');

  fs.readFile(path, (err, content) => {
    if (err) {
      res.writeHead(400, {
        'Content-type': 'text/html'
      });
      res.end('error');
    } else {
      const quality = 60;
      const hd = null;
      const optimizationLevel = (hd || quality >= 60) ? 1 : 2;

      imagemin.buffer(content, {
          plugins: [
            imageminGifsicle({
              optimizationLevel,
              interlaced: true
            }),
            imageminMozjpeg({
              quality
            }),
            imageminJpegtran({
              progressive: true
            }),
            imageminPngquant({
              quality: `${quality}-80`
            }),
          ],
        })
        .then((compressedImage) => {
          res.writeHead(200, {
            'Content-Type': `${mime1}/${mime2}`
          });
          res.writeHead(200, {
            etag: `'W/${req.params.path}'`
          });
          return res.end(compressedImage);
        })
        .catch((error) => {
          console.log(error);
          return res.end(content);
        });
    }
  });
};


exports.downloadFile = () => {
  // const filePath = req.params.path;

  const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true';
  const path = Path.resolve(process.env.BASE_PATH, '/', 'code.jpg');

  axios
    .get(url, {
      responseType: 'stream'
    })
    .then((response) => {
      response.data.pipe(fs.createWriteStream(path));
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.uploadFiles = (req, res) => {
  res.json({
    files: req.files,
    message: 'success',
    text: 'File has been uploaded.'
  })
};

exports.addRecents = (req, res) => {
  Api.find({
      recentId: req.body.id
    })
    .exec()
    .then((file) => {

      if (file.length <= 0) {

        const recents = new Api({
          recentId: req.body.id,
          date: new Date(),
        });

        recents.save()
          .then(() => {
            res.status(201).json({
              message: 'Registered.',
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      } else{
        res.status(201).json({
          message: 'Updated.',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
