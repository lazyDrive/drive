const fs = require('fs');

/**
 * Decode base64 string to buffer.
 *
 * @param {String} base64Str string
 * @return {Object} Image object with image type and data buffer.
 * @public
 */
function decodeBase64Image(base64Str) {
  const matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const image = {};
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }

  // eslint-disable-next-line prefer-destructuring
  image.type = matches[1];
  // eslint-disable-next-line no-buffer-constructor
  image.data = new Buffer(matches[2], 'base64');

  return image;
}


/**
 * Change base64Str to image and write image file with
   the specified file name to the specified file path.
 * @param {String} base64 string (mandatory)
 * @param {String} file path e.g. /opt/temp/uploads/ (mandatory)
 * @return {Object} optionsObj holds image type, image filename, debug e.g.{'fileName':fileName, 'type':type,'debug':true} (optional)
 * @public
 */
function base64ToImage(base64Str, path, optionalObj) {
  if (!base64Str || !path) {
    throw new Error('Missing mandatory arguments base64 string and/or path string');
  }

  const optionalObj = optionalObj || {};
  const imageBuffer = decodeBase64Image(base64Str);
  let imageType = optionalObj.type || imageBuffer.type || 'png';
  let fileName = optionalObj.fileName || `img-${Date.now()}`;
  fileName = `${fileName}`;

  if (fileName.indexOf('.') === -1) {
    imageType = imageType.replace('image/', '');
    fileName = `${fileName}.${imageType}`;
  }

  const abs = path + fileName;
  fs.writeFile(abs, imageBuffer.data, 'base64', (err) => {
    if (err && optionalObj.debug) {
      console.log('File image write error', err);
    }
  });
  return {
    imageType,
    fileName,
  };
}

/**
 * Module exports.
 * @public
 */
module.exports = base64ToImage;
