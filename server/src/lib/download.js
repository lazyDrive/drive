
const path = require('path');
const url = require('url');
const http = require('http');
const fs = require('fs');

let write_file;
// what global variable do we have?
let complete = false;
let content_length = 0;
let downloaded_bytes = 0;

// create the downloader 'class'
class Downloader {
  constructor() {
    // we will need to be able to set the remote file to download
    this.set_remote_file = function (file) {
      remote_file = file;
      local_file = path.basename(remote_file);
    };
    // we want to set the local file to write to
    this.set_local_file = function (file) {
      local_file = file;
    };
    // run this fukker!
    this.run = function () {
      // start the download
      this.download(remote_file, local_file, 0);
    };
    this.download = function (remote, local, num) {
      console.log(remote);
      if (num > 10) {
        console.log('Too many redirects');
      }
      // remember who we are
      const self = this;
      // set some default values
      const redirect = false;
      let new_remote = null;
      const write_to_file = false;
      let write_file_ready = false;
      // parse the url of the remote file
      const u = url.parse(remote);
      // set the options for the 'get' from the remote file
      const opts = {
        host: u.hostname,
        port: u.port,
        path: u.pathname,
      };
      // get the file
      var request = http.get(opts, (response) => {
        switch (response.statusCode) {
          case 200:
            // this is good
            // what is the content length?
            content_length = response.headers['content-length'];
            break;
          case 302:
            new_remote = response.headers.location;
            self.download(new_remote, local_file, num + 1);
            return;
            break;
          case 404:
            console.log('File Not Found');
          default:
            // what the hell is default in this situation? 404?
            request.abort();
            return;
        }
        response.on('data', (chunk) => {
          //are we supposed to be writing to file?
          if (!write_file_ready) {
            //set up the write file
            write_file = fs.createWriteStream(local_file);
            write_file_ready = true;
          }
          write_file.write(chunk);
          downloaded_bytes += chunk.length;
          percent = parseInt((downloaded_bytes / content_length) * 100);
          console.log(percent);
        });
        response.on('end', () => {
          complete = true;
          write_file.end();
        });
      });
      request.on('error', (e) => {
        console.log('Got error: ' + e.message);
      });
    };
  }
}
exports.Downloader = Downloader;
