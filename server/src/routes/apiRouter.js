const express = require('express');

const fs = require('fs');

const router = express.Router();

const ApiModel = require('../models/apiModel');

const uploadFolder = './uploads/';

// Get
router.get('/getContents', (req, res) => {

  var files = [];
  fs.readdirSync(uploadFolder).forEach(file => {
    files.push(file);

    console.log(file);
  })

  res.status(200).send(({
    files: files,
  }));

  // ApiModel.find()
  //   .exec()
  //   .then((content) => {
  //     res.status(200).send(({
  //       files: content,
  //     }));
  //   })
  //   .catch();
});

// Post
router.post('/ninjas', (req, res, next) => {
  ApiModel.create(req.body).then((ninja) => {
    res.send(ninja);
  }).catch(next);
});

// Update
router.put('/ninjas/:id', (req, res) => {
  ApiModel.findOneAndUpdate({ _id: req.params.id }, req.body).then(() => {
    ApiModel.findOne({ _id: req.params.id }).then((ninja) => {
      res.send(ninja);
    });
  });
});

// Delete
router.delete('/ninjas/:id', (req, res) => {
  ApiModel.findOneAndDelete({ _id: req.params.id }).then((ninja) => {
    res.send(ninja);
  });
});

module.exports = router;
