/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
const fs = require('fs-extra');
const Path = require('path');

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require('imagemin-gifsicle');

const ffmpeg = require('fluent-ffmpeg');

// eslint-disable-next-line prefer-destructuring
const PDFImage = require('pdf-image').PDFImage;

exports.genPdfImage = (filePath, eventControl) => {
  const name = Path.basename(filePath).split('.').slice(0, -1).join('.');
  const cacheFolder = Path.dirname(filePath);
  const targetFolder = `.cache/${cacheFolder}`;

  if (!fs.existsSync(`${targetFolder}/${name}-0.png`)) {
    if (eventControl !== 'subscribe') {
      const pdfImage = new PDFImage(filePath, {
        outputDirectory: targetFolder,
        graphicsMagick: true,
        convertOptions: {
          '-resize': '2000x2000',
          '-quality': '75',
        },
      });

      fs.ensureDirSync(targetFolder);

      pdfImage.convertPage(0).then(() => {
        console.log('PDF Cached.');
      });
    }
    return false;
  }
  return `${targetFolder}/${name}-0.png`;
};

exports.cacheImage = (filePath) => {
  if (!fs.existsSync(`.cache/${filePath}`)) {
    fs.readFile(filePath, (err, content) => {
      if (err) throw err;

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
          const name = Path.basename(filePath);
          const dir = Path.dirname(filePath);

          const targetFolder = `.cache/${dir}`;
          fs.ensureDir(targetFolder)
            .then(() => {
              fs.writeFile(`${targetFolder}/${name}`, compressedImage, (error) => {
                if (error) throw error;
                console.log('Image Cached.');
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
    });

    return false;
  }
  return `.cache/${filePath}`;
};


exports.cacheVideoImage = (path, item, eventControl) => {
  const name = `${item.split('.').slice(0, -1).join('.')}.png`;
  const targeVideo = `.cache/${path}${name}`;

  fs.ensureDirSync(`.cache/${path}`);

  if (!fs.existsSync(targeVideo)) {
    if (eventControl !== 'subscribe') {
      ffmpeg(path + item)
        .screenshots({
          timestamps: ['1%'],
          filename: name,
          count: 1,
          folder: `.cache/${path}`,
          size: '800x450',
        });
      console.log('Video Thumb generated.');
    }
    return false;
  }
  return targeVideo;
};
