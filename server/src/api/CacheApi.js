/* eslint-disable class-methods-use-this */
const fs = require('fs-extra');
const Path = require('path');

// eslint-disable-next-line prefer-destructuring
const PDFImage = require('pdf-image').PDFImage;

exports.genPdfImage = (req) => {

  const path = Buffer.from(req.params.path, 'base64').toString('ascii');

  const name = Path.basename(path);
  const cacheFolder = path.dirname(path);

  const targetFolder = '.cache' + cacheFolder.split('.')[1];
  fs.ensureDir(targetFolder)
    .then(() => {
      fs.writeFile(`${targetFolder}/${name}`, compressedImage, function (err) {
        if (err) throw err;
        console.log('Cached.');
      });
    })
    .catch((err) => {
      console.log(err);
    });

  const pdfImage = new PDFImage(uploadFolder + file, {
    outputDirectory: './.cache/',
    graphicsMagick: true,
    convertOptions: {
      '-resize': '2000x2000',
      '-quality': '75',
    },
  });

  pdfImage.convertPage(0).then((imagePath) => {
    console.log(imagePath);
  });
};
