const fs = require('fs-extra');
const axios = require('axios');
const Path = require('path');

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require('imagemin-gifsicle');
// eslint-disable-next-line prefer-destructuring
// const PDFImage = require('pdf-image').PDFImage;

const Api = require('../models/apiModel');
const LocalAdapter = require('./../api/LocalAdapter');

const uploadFolder = './uploads/';

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

exports.getFiles = (req, res, next) => {
  const adapter = new LocalAdapter(req, res, next, './');

  let dir = './uploads/';


  if (req.params.dir !== 'my-drive') {
    dir = `${Buffer.from(req.params.dir, 'base64').toString('ascii')  }/`;
  }

  const files = adapter.getFiles(dir);

  files.sort(function (a, b) {
    if (a.type == 'dir') return -1;
    if (b.type == 'file') return 1;

    return 0;
  });

  res.status(200).send(({
    contents: files,
  }));
};


exports.deleteFiles = (req, res, next) => {
  const path = Buffer.from(req.params.path, 'base64').toString('ascii');
  const adapter = new LocalAdapter(req, res, next, path);
  adapter.delete(path);
};

exports.thirdParty = (req, res) => {
  const path = Buffer.from(req.params.path, 'base64').toString('ascii');

  fs.readFile(path, (err, content) => {
    if (err) {
      res.writeHead(400, {
        'Content-type': 'text/html',
      });
      res.end('error');
    } else {
      res.writeHead(200, {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31557600',
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
        'Content-type': 'text/html',
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
          end,
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

exports.serveImages = (req, res, next) => {
  const mime1 = req.params.mime1;
  const mime2 = req.params.mime2;
  const path = Buffer.from(req.params.path, 'base64').toString('ascii');

  const adapter = new LocalAdapter(req, res, next, path);

  fs.readFile(path, (err, content) => {
    if (err) {
      res.writeHead(400, {
        'Content-type': 'text/html',
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
              interlaced: true,
            }),
            imageminMozjpeg({
              quality,
            }),
            imageminJpegtran({
              progressive: true,
            }),
            imageminPngquant({
              quality: `${quality}-80`,
            }),
          ],
        })
        .then((compressedImage) => {

          const name = Path.basename(path);
          const cacheFolder = adapter.getDir(path);

          const targetFolder = './.cache' + cacheFolder.split('.')[1];
          fs.ensureDir(targetFolder)
            .then(() => {
              fs.writeFile(`${targetFolder}/${name}`, compressedImage, function (err) {
                if (err) throw err;
              });
            })
            .catch((err) => {
              console.log(err)
            });

          res.writeHead(200, {
            'Content-Type': `${mime1}/${mime2}`,
            'Cache-Control': 'public, max-age=31557600',
            etag: `'W/${req.params.path}'`,
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
  const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true';
  const path = Path.resolve(process.env.BASE_PATH, '/', 'code.jpg');

  axios
    .get(url, {
      responseType: 'stream',
    })
    .then((response) => {
      response.data.pipe(fs.createWriteStream(path));
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.createDirectory = (req, res, next) => {

  let path = './uploads/';

  if (req.params.path !== 'my-drive') {
    path = Buffer.from(req.params.path, 'base64').toString('ascii');
  }

  const adapter = new LocalAdapter(req, res, next, path);

  const targetFolder = `${path}/${req.body.foldername}`;

  adapter.createDir(targetFolder);
};


exports.rename = (req, res, next) => {
  const path = Buffer.from(req.params.path, 'base64').toString('ascii');
  res.status(200).send(({
    message: 'Renamed',
    path,
  }));
};

exports.uploadFiles = (req, res) => {
  res.json({
    message: 'success',
    text: 'File has been uploaded.',
  });
};

exports.log = (req, res, next) => {
  Api.find({
      recentId: req.body.id,
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
      } else {
        Api.update({
            recentId: req.body.id,
          }, {
            data: new Date(),
          })
          .then(() => {
            res.status(201).json({
              message: 'Updated.',
            });
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.test = (req, res) => {
  const quick = [];

  Api.find()
    .limit(7)
    .sort({
      date: 1,
    })
    .exec()
    .then((result) => {
      result.forEach((val) => {
        quick.push(val.recentId);
      });
      res.status(200).json({
        quick,
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
