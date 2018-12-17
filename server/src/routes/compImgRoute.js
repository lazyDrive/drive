const express = require('express');
const fs = require('fs');
const util = require('util');
const router = express.Router();

const url = require('url');

//IMAGE COMPRESION DEPENDENCIES

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require('imagemin-gifsicle');

//Remote image loader
const got = require('got');


function getDeviceQuality(device) {
    var quality = 60;
    switch (device) {
        case "mobile-sm":
            quality = 20;
            break;
        case "mobile-md":
            quality = 35;
            break;
        case "tablet":
            quality = 50;
            break;
        case "computer-md":
            quality = 70;
            break;
        case "computer-xl":
            quality = 90;
            break;
        default:
            break;
    }
    return quality;
}

// Get
router.get('/:file', (req, res) => {

  var reqURL = url.parse(req.url, true);

  if (reqURL.search != "") {

    const { file, device, hd } = reqURL.query;

    if (file) {

      var quality = hd ? 90 : getDeviceQuality(20),

      optimizationLevel = (hd || quality >= 60) ? 1 : 2;

      got.get(file,{encoding:null})
      .then(imageResponse=>{
        imagemin.buffer(imageResponse.body,{
          plugins:[
            imageminGifsicle({optimizationLevel,interlaced:true}),
            imageminMozjpeg({quality}),
            imageminJpegtran({progressive:true}),
            imageminPngquant({quality:`${quality}-80`})
          ]
        })
        .then(compressedImage=>{
          return response.end(compressedImage)
        })
        .catch(error=>{
          return response.end("Couldn't compress image\n\n"+error)
        })
      })
      .catch(error=>{
        return response.end("Couldn't load image from remote source\n\n"+error)
      })

    } else {
      response.end("Missing image file !")
    }
  }else{
    response.end("Node.js image API")
  }

});

module.exports = router;
