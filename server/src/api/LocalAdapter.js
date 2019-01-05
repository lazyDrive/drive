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
const crypto = require('crypto');

const desiredMode = 0o2775;

class LocalAdapter {
  /**
   * Constructor
   *
   * @param
   *
   */
  constructor(req, res, next, rootPath = './uploads/') {
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
      this.rootPath = './';
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

    fs.ensureDirSync(dir)
      .then(() => {
        console.log('success!');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   *
   *
   */
  copy(sourcePath, destinationPath) {
    fs.ensureDirSync(destinationPath, desiredMode, (err) => {
      console.log(err); // => null
      // dir has now been created with mode 0o2775, including the directory it is to be placed in

      // Work with both files and dir
      fs.copySync(sourcePath, destinationPath)
        .then(() => {
          console.log('success!');
        })
        .catch((err) => {
          console.error(err);
        });
    });

    return destinationPath;
  }

  /**
   *
   *
   */
  move(sourcePath, destinationPath) {
    // With Promises:
    fs.moveSync(sourcePath, destinationPath, {
      overwrite: true,
    })
      .then(() => {
        this.res.status(200).json({
          r: 'srcces',
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   *
   *
   */
  delete(path) {
    // With Promises:
    fs.removeSync(path)
      .then(() => {
        console.log('success!');
      })
      .catch((err) => {
        console.error(err);
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
    const fileBuffer = null;

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
        itemDataObj.filePath = `/api/images/${Buffer.from(path + item).toString('base64')}/t/${itemDataObj.extension}/d/200/200/m/${itemDataObj.mime_type}/${itemDataObj.id}`;
      } else {
        itemDataObj.filePath = `/api/files/${Buffer.from(path + item).toString('base64')}/t/${itemDataObj.extension}/m/${itemDataObj.mime_type}/s/${stats.size}/${itemDataObj.id}`;
      }


      const extImgPath = `./thirdParty/${itemDataObj.extension}.svg`;

      itemDataObj.extImg = `/api/thirdParty/${Buffer.from(extImgPath).toString('base64')}/t/${itemDataObj.extension}`;
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
