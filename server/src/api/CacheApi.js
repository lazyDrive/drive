/* eslint-disable class-methods-use-this */
const fs = require('fs-extra');
const Path = require('path');

// eslint-disable-next-line prefer-destructuring
const PDFImage = require('pdf-image').PDFImage;

exports.genPdfImage = (filePath) => {
  const name = Path.basename(filePath).split('.').slice(0, -1).join('.');
  const cacheFolder = Path.dirname(filePath);
  const targetFolder = `.cache/${  cacheFolder}`;

  const pdfImage = new PDFImage(filePath, {
    outputDirectory: targetFolder,
    graphicsMagick: true,
    convertOptions: {
      '-resize': '2000x2000',
      '-quality': '75',
    },
  });

  fs.ensureDirSync(targetFolder);

  pdfImage.convertPage(0).then((imagePath) => {
    console.log(Generated + imagePath);
  });

  return `${targetFolder}/${name}-0.png`;
};
