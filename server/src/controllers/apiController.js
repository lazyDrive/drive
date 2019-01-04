const fs = require('fs');
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

  const files = adapter.getFiles('./uploads/');

  res.status(200).send(({
    contents: files,
  }));

};


exports.deleteFiles = (req, res) => {
  const path = Buffer.from(req.params.path, 'base64').toString('ascii');

  try {
    fs.unlinkSync(path);

    res.status(202).json({
      message: 'Deleted.',
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
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

exports.serveImages = (req, res) => {
  const mime1 = req.params.mime1;
  const mime2 = req.params.mime2;
  const path = Buffer.from(req.params.path, 'base64').toString('ascii');

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

exports.renameFile = (req, res) => {
  const oldPath = req.body.item.path;

  let fileName = oldPath.split('/')[oldPath.length - 1];
  const newPath = req.body.new;

  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err;

    fs.stat(newPath, (err, stats) => {
      if (err) throw err;

      res.status(200).json({
        message: 'Renamed',
        stats: JSON.stringify(stats),
      });
    });
  });
};

exports.uploadFiles = (req, res) => {
  res.json({
    files: req.files,
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
