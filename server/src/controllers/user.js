const _ = require('underscore');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Settings = require('../models/settings');

exports.user_signup = (req, res, next) => {
  User.find({
    email: req.body.email,
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'User with this mail already exist.',
        });
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        if (req.body.name != '' && req.body.name != undefined) {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
            date: new Date(),
          });

          user.save()
            .then((result) => {
              const settingConfig = {};
              settingConfig.email = req.body.email;
              settingConfig.name = req.body.name;
              const defaultSettings = new Settings({
                _id: new mongoose.Types.ObjectId(),
                // eslint-disable-next-line no-underscore-dangle
                uid: result._id,
                name: req.body.name,
                email: req.body.email,
                settings: settingConfig,
                date: new Date(),
              });

              defaultSettings.save()
                .then(() => {
                  res.status(201).json({
                    message: 'User created',
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    error: err,
                  });
                });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        } else {
          return res.status(406).json({
            message: 'Name is required.',
          });
        }
      });
    });
};

exports.user_login = (req, res, next) => {
  User.find({
    email: req.body.email,
  })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed.',
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed.',
          });
        }

        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0]._id,
          },
          process.env.JWT_KEY, {
            expiresIn: '2 days',
          });

          // eslint-disable-next-line no-param-reassign
          user[0].password = '';

          return res.status(200).json({
            message: 'Auth successful.',
            token,
            userData: user[0],
          });
        }

        res.status(401).json({
          message: 'Auth failed',
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({
    _id: req.params.userId,
  })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'User deleted',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_settings = (req, res, next) => {
  Settings.find({
    email: req.body.settings.email,
  })
    .exec()
    .then((userSettings) => {
      if (req.body.action === 'set') {
        const newSettings = req.body.settings;
        Settings.updateMany({
          email: req.body.settings.email,
        }, {
          settings: newSettings,
          data: new Date(),
        })
          .then(() => {
            res.status(201).json({
              message: 'Settings Updated.',
              settings: newSettings,
            });
          })
          .catch((err) => {
            next(err);
          });
      } else if (req.body.action === 'get') {
        res.status(200).json({
          settings: userSettings[0].settings,
        });
      }
    }).catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
