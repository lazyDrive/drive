import Dropbox from 'dropbox';
import axios from 'axios'

/**
 * Dropbox api service for lazy drive.
 */
class DropboxApi {

  constructor(accessToken) {
    this.ACCESS_TOKEN = accessToken;
    this.UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
    this.dbx = new Dropbox.Dropbox({
      accessToken: this.ACCESS_TOKEN,
      fetch: axios
    });
  }

  fetchFile(path = '') {
    return new Promise((resolve, reject) => {
      this.dbx.filesListFolder({
          path: path
        })
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    })
  }

  downloadFile(SHARED_LINK) {
    this.dbx.sharingGetSharedLinkFile({
        url: SHARED_LINK
      })
      .then(function (data) {
        let downloadUrl = URL.createObjectURL(data.fileBlob);
        let downloadButton = document.createElement('a');
        downloadButton.setAttribute('href', downloadUrl);
        downloadButton.setAttribute('download', data.name);
        downloadButton.setAttribute('class', 'button');
        downloadButton.innerText = 'Download: ' + data.name;
        document.getElementById('results').appendChild(downloadButton);
      })
      .catch(function (error) {
        console.error(error);
      });
    return false;
  }

  uploadFile(fileInput) {

    const file = fileInput.files[0];

    if (file.size < this.UPLOAD_FILE_SIZE_LIMIT) { // File is smaller than 150 Mb - use filesUpload API

      return new Promise((resolve, reject) => {
        this.dbx.filesUpload({
            path: '/' + file.name,
            contents: file
          })
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      })

    } else {
      // File is bigger than 150 Mb - use filesUploadSession* API

      // 8Mb - Dropbox JavaScript API suggested max file / chunk size
      const maxBlob = 8 * 1000 * 1000;

      const workItems = [];

      let offset = 0;

      while (offset < file.size) {
        let chunkSize = Math.min(maxBlob, file.size - offset);
        workItems.push(file.slice(offset, offset + chunkSize));
        offset += chunkSize;
      }

      const task = workItems.reduce((acc, blob, idx, items) => {
        if (idx == 0) {
          // Starting multipart upload of file
          return acc.then(function () {
            return this.dbx.filesUploadSessionStart({
                close: false,
                contents: blob
              })
              .then(response => response.session_id)
          });
        } else if (idx < items.length - 1) {
          // Append part to the upload session
          return acc.then(function (sessionId) {
            let cursor = {
              session_id: sessionId,
              offset: idx * maxBlob
            };
            return this.dbx.filesUploadSessionAppendV2({
              cursor: cursor,
              close: false,
              contents: blob
            }).then(() => sessionId);
          });
        } else {
          // Last chunk of data, close session
          return acc.then(function (sessionId) {
            let cursor = {
              session_id: sessionId,
              offset: file.size - blob.size
            };
            let commit = {
              path: '/' + file.name,
              mode: 'add',
              autorename: true,
              mute: false
            };
            return this.dbx.filesUploadSessionFinish({
              cursor: cursor,
              commit: commit,
              contents: blob
            });
          });
        }
      }, Promise.resolve());


      return new Promise((resolve, reject) => {
        task.then(function (result) {
          resolve(result);
        }).catch(function (error) {
          reject(error);
        });
      })
    }
  }
}

export let dropboxApi = new DropboxApi();
