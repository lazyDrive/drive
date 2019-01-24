const jwt = require('jsonwebtoken');
const _ = require('underscore');

module.exports = (req, res, next) => {
  try {

    const cookies = {};
    _(req.headers.cookie.split(';'))
      .chain()
      .map(m => m.replace(/^\s+/, '').replace(/\s+$/, ''))
      .each((c) => {
        const arr = c.split('=');
        const key = arr[0];
        let value = null;
        const size = _.size(arr);
        if (size > 1) {
          value = arr.slice(1).join('');
        }
        cookies[key] = value;
      });

    const { token } = cookies;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'You are not authorized.',
    });
  }
  return true;
};
