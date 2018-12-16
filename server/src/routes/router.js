const express = require('express');

const NinjaModel = require('../models/model');

const router = express.Router();

// Get
router.get('/ninjas', (req, res) => {
  res.send(({ type: 'GET' }));
});

// Post
router.post('/ninjas', (req, res, next) => {
  NinjaModel.create(req.body).then((ninja) => {
    res.send(ninja);
  }).catch(next);
});

// Update
router.put('/ninjas/:id', (req, res) => {
  NinjaModel.findOneAndUpdate({ _id: req.params.id }, req.body).then(() => {
    NinjaModel.findOne({ _id: req.params.id }).then((ninja) => {
      res.send(ninja);
    });
  });
});

// Delete
router.delete('/ninjas/:id', (req, res) => {
  NinjaModel.findOneAndDelete({ _id: req.params.id }).then((ninja) => {
    res.send(ninja);
  });
});

module.exports = router;
