/* eslint-disable class-methods-use-this */
/**
 * @package     Media Manager
 * @SubPackage  LocalAdapter
 *
 * @copyright   Copyright (C) 2019. All rights reserved.
 * @license     GNU General Public License
 */

const fs = require('fs-extra');
const pathModule = require('path');
const sizeOf = require('image-size');
const util = require('util');
const mime = require('mime-types');
const StreamZip = require('node-stream-zip');
const crypto = require('crypto');
const ffmpeg = require('fluent-ffmpeg');
const cacheApi = require('./CacheApi');

const desiredMode = 0o2775;

class LocalAdapter {
  /**
   * Constructor
   *
   * @param
   *
   */
  constructor(req, res, next, rootPath = 'uploads/') {
    // Request
    this.req = req;

    // Response
    this.res = res;

    // Next
    this.next = next;

    // Root Path
    if (fs.statSync(rootPath).isDirectory()) {
      this.rootPath = rootPath;
    } else {
      this.rootPath = '/';
    }
  }

  /**
   *
   *
   */
  getFiles(path) {
    const data = [];
    // Read each items in folder
    fs.readdirSync(path).forEach((item) => {
      const itemData = this.getPathInformation(path, item);
      data.push(itemData);
    });

    return data;
  }

  /**
   *
   *
   */
  getDir(path) {
    if (fs.statSync(path).isDirectory()) {
      return path;
    }
    return path.substring(0, path.lastIndexOf('/'));
  }

  /**
   *
   *
   */
  createDir(path) {
    const dir = path;

    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
      this.res.status(409).json({
        message: 'Folder already exist.',
        dir,
      });
    } else {
      fs.ensureDir(dir)
        .then(() => {
          this.res.status(200).json({
            message: 'Created',
            dir,
          });
        })
        .catch((err) => {
          this.res.status(500).json({
            error: err,
            dir,
          });
        });
    }
  }

  /**
   *
   *
   */
  copy(sourcePath, destinationPath) {
    fs.ensureDirSync(destinationPath, desiredMode, (err) => {
      // eslint-disable-next-line no-console
      console.log(err); // => null
      // dir has now been created with mode 0o2775, including the directory it is to be placed in

      // Work with both files and dir
      fs.copy(sourcePath, destinationPath)
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('success!');
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.warn(err);
        });
    });

    return destinationPath;
  }

  /**
   *
   *
   */
  move(sourcePath, destinationPath) {
    return new Promise((resolve, reject) => {
      fs.move(sourcePath, destinationPath, {
          overwrite: true,
        })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   *
   *
   */
  delete(path) {
    return new Promise((resolve, reject) => {
      fs.remove(path)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Returns the folder or file information for the given path. The returned object
   * has the following properties:
   * - type:          The type can be file or dir
   * - name:          The name of the file
   * - path:          The relative path to the root
   * - extension:     The file extension
   * - size:          The size of the file
   * - create_date:   The date created
   * - modified_date: The date modified
   * - mime_type:     The mime type
   * - width:         The width, when available
   * - height:        The height, when available
   * - thumb_path     The thumbnail path of file, when available
   *
   */
  getPathInformation(path, item) {
    const itemDataObj = {};
    const shasum = crypto.createHash('sha1');
    const stats = fs.statSync(path + item);
    let isDir = false;

    if (fs.statSync(path + item).isDirectory()) {
      isDir = true;
    }

    itemDataObj.name = item;

    shasum.update(path + item + stats.mtime);
    itemDataObj.id = shasum.digest('hex');
    itemDataObj.type = !isDir ? 'file' : 'dir';
    itemDataObj.mime_type = isDir ? 'directory' : '';

    if (!isDir) {
      // eslint-disable-next-line prefer-destructuring
      itemDataObj.extension = pathModule.extname(path + item).split('.')[1];
      itemDataObj.mime_type = mime.lookup(path + item);

      if (itemDataObj.mime_type === 'image/jpeg' || itemDataObj.mime_type === 'image/png' || itemDataObj.mime_type === 'image/jpg' || itemDataObj.mime_type === 'image/gif') {
        const dimensions = sizeOf(path + item);

        itemDataObj.height = !isDir ? dimensions.height : '';
        itemDataObj.width = !isDir ? dimensions.width : '';

        itemDataObj.imgLazyUrl = `/api/images/${Buffer.from(path + item).toString('base64')}/t/${itemDataObj.extension}/d/200/200/m/${itemDataObj.mime_type}/${itemDataObj.id}`;
        itemDataObj.imgUrl = `/api/images/${Buffer.from(path + item).toString('base64')}/t/${itemDataObj.extension}/d/200/200/m/${itemDataObj.mime_type}/${itemDataObj.id}`;
      } else if (itemDataObj.extension === 'pdf') {
        const padfImagePath = cacheApi.genPdfImage(path + item);

        if (fs.existsSync(padfImagePath)) {
          itemDataObj.imgLazyUrl = `/api/images/${Buffer.from(padfImagePath).toString('base64')}/t/png/d/200/200/m/image/png/${itemDataObj.id}`;
          itemDataObj.imgUrl = `/api/images/${Buffer.from(padfImagePath).toString('base64')}/t/png/d/200/200/m/image/png/${itemDataObj.id}`;
        }
      } else if (itemDataObj.extension === 'mp4') {
        const name = `${item.split('.').slice(0, -1).join('.')}.png`;

        const targeVideo = `.cache/${path}${name}`;

        if (fs.existsSync(targeVideo)) {
          itemDataObj.imgLazyUrl = `/api/images/${Buffer.from(targeVideo).toString('base64')}/t/png/d/200/200/m/image/png/${itemDataObj.id}`;
          itemDataObj.imgUrl = `/api/images/${Buffer.from(targeVideo).toString('base64')}/t/png/d/200/200/m/image/png/${itemDataObj.id}`;
        } else {
          fs.ensureDirSync(`.cache/${path}`);

          if (!fs.existsSync(`.cache/${path + item}`)) {
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
        }
      } else if (itemDataObj.extension === 'zip') {
        // const zip = new StreamZip({
        //   file: path + item,
        //   storeEntries: true,
        // });

        // zip.on('ready', () => {
        //   console.log(`Entries read: ${  zip.entriesCount}`);
        //   // eslint-disable-next-line no-restricted-syntax
        //   for (const entry of Object.values(zip.entries())) {
        //     const desc = entry.isDirectory ? 'directory' : `${entry.size} bytes`;
        //     console.log(`Entry ${entry.name}: ${desc}`);
        //   }
        //   // Do not forget to close the file once you're done
        //   zip.close();
        // });
      }

      let extImgPath = '';
      if (itemDataObj.extension && fs.existsSync(`./thirdParty/${itemDataObj.extension}.svg`)) {
        extImgPath = `./thirdParty/${itemDataObj.extension}.svg`;
        itemDataObj.extImg = `/api/thirdParty/${Buffer.from(extImgPath).toString('base64')}/t/${itemDataObj.extension}`;
      } else {
        extImgPath = './thirdParty/file.svg';
        itemDataObj.extImg = `/api/thirdParty/${Buffer.from(extImgPath).toString('base64')}/t/file`;
      }

      itemDataObj.filePath = `/api/files/${Buffer.from(path + item).toString('base64')}/t/${itemDataObj.extension}/m/${itemDataObj.mime_type}/s/${stats.size}/${itemDataObj.id}`;
      itemDataObj.imgLazyUrl = itemDataObj.extImg;
    }

    itemDataObj.color = isDir ? '#3949AB' : '';
    itemDataObj.size = !isDir ? stats.size : '';

    const atime = new Date(util.inspect(stats.atime));
    const mtime = new Date(util.inspect(stats.mtime));
    const ctime = new Date(util.inspect(stats.ctime));

    itemDataObj.assigned_date = atime;
    itemDataObj.modified_date = mtime;
    itemDataObj.created_date = ctime;

    itemDataObj.path = Buffer.from(path + item).toString('base64');

    return itemDataObj;
  }
}

module.exports = LocalAdapter;
