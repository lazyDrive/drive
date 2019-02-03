/* eslint-disable no-console */
const fs = require('fs-extra');
const Archiver = require('archiver');
const axios = require('axios');
const Path = require('path');

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require('imagemin-gifsicle');

const Api = require('../models/apiModel');
const LocalAdapter = require('./../api/LocalAdapter');

const uploadFolder = 'uploads/';

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

exports.getFiles = (req, res, next) => {
  const adapter = new LocalAdapter(req, res, next, './');

  let dir = 'uploads/';


  if (req.params.dir !== 'my-drive') {
    dir = `${Buffer.from(req.params.dir, 'base64').toString('ascii')}/`;
  }

  adapter.getFiles(dir).then((files) => {
    res.status(200).send(({
      contents: files,
    }));
  }).catch((err) => {
    res.status(500).json({
      error: err,
    });
  });
};


exports.deleteFiles = (req, res, next) => {
  const path = Buffer.from(req.params.path, 'base64').toString('ascii');
  const adapter = new LocalAdapter(req, res, next, path);

  adapter.delete(path).then(() => {
    res.status(200).json({
      message: 'Deleted',
      path,
    });
  }).catch((err) => {
    res.status(500).json({
      error: err,
      path,
    });
  });
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
        'Cache-Control': 'private, max-age=86400, no-transform',
      });
      res.end(content);
    }
  });
};


exports.serveFiles = (req, res) => {
  const path = Buffer.from(req.params.path, 'base64').toString('ascii');
  const {
    mime1,
  } = req.params;
  const {
    mime2,
  } = req.params;

  fs.readFile(path, (err) => {
    if (err) {
      res.writeHead(400, {
        'Content-type': 'text/html',
      });
      res.end('error');
    } else {
      const stat = fs.statSync(path);
      const fileSize = stat.size;
      const {
        range,
      } = req.headers;

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
  const {
    mime1,
  } = req.params;
  const {
    mime2,
  } = req.params;
  let cached = false;
  let path = Buffer.from(req.params.path, 'base64').toString('ascii');

  const adapter = new LocalAdapter(req, res, next, path);

  if (fs.existsSync(`.cache/${path}`)) {
    path = `.cache/${path}`;
    cached = true;
  }

  const cacheFolder = adapter.getDir(path);

  // Check for cache
  const iscacheFolder = cacheFolder.split('/')[0];

  fs.readFile(path, (err, content) => {
    if (err) {
      res.writeHead(400, {
        'Content-type': 'text/html',
      });
      res.end('error');
    } else if (!cached && iscacheFolder !== '.cache') {
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
            quality: [0.3, 0.5],
          }),
        ],
      })
        .then((compressedImage) => {
          const name = Path.basename(path);

          const targetFolder = `.cache/${cacheFolder}`;
          fs.ensureDir(targetFolder)
            .then(() => {
              fs.writeFile(`${targetFolder}/${name}`, compressedImage, (err) => {
                if (err) throw err;
                console.log('Cache Saved.');

                const stat = fs.statSync(`.cache/${path}`);
                const fileSize = stat.size;
                const head = {
                  'Content-Length': fileSize,
                  'Cache-Control': 'private, max-age=86400, no-transform',
                  'Content-Type': `${mime1}/${mime2}`,
                };
                res.writeHead(200, head);
                fs.createReadStream(`.cache/${path}`).pipe(res);
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          console.log(error);
          const stat = fs.statSync(path);
          const fileSize = stat.size;
          const head = {
            'Content-Length': fileSize,
            'Cache-Control': 'private, max-age=86400, no-transform',
            'Content-Type': `${mime1}/${mime2}`,
          };
          res.writeHead(200, head);
          fs.createReadStream(path).pipe(res);
        });
    } else {
      const stat = fs.statSync(path);
      const fileSize = stat.size;
      const head = {
        'Content-Length': fileSize,
        'Cache-Control': 'private, max-age=86400, no-transform',
        'Content-Type': `${mime1}/${mime2}`,
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
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


exports.zip_batch = (req, res, next) => {
  res.writeHead(200, {
    'Content-Type': 'application/zip',
    'Content-disposition': 'attachment; filename=myFile.zip',
  });

  const archiverZip = Archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  archiverZip.on('error', (err) => {
    throw err;
  });

  archiverZip.pipe(res);

  req.body.files.forEach((file) => {
    const filePath = Buffer.from(file.path, 'base64').toString('ascii');
    archiverZip.append(fs.createReadStream(filePath), { name: file.name });
  });

  archiverZip.finalize();
};

exports.createDirectory = (req, res, next) => {
  let path = 'uploads/';

  if (req.params.path !== 'my-drive') {
    path = Buffer.from(req.params.path, 'base64').toString('ascii');
  }

  const adapter = new LocalAdapter(req, res, next, path);

  const targetFolder = `${path}/${req.body.foldername}`;

  adapter.createDir(targetFolder);
};


exports.rename = (req, res, next) => {
  const oldPath = Buffer.from(req.params.path, 'base64').toString('ascii');
  const {
    newName,
  } = req.body;
  const dir = Path.dirname(oldPath);
  const newPath = Path.join(dir, newName);

  const adapter = new LocalAdapter(req, res, next, oldPath);

  adapter.move(oldPath, newPath).then(() => {
    res.status(200).json({
      message: 'Renamed',
    });
  })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
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
