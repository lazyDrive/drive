const path = require('path')
module.exports = {
  outputDir: path.resolve(__dirname, './server/public/'),
  pwa: {
    name: 'Media Manager',
    themeColor: '#9013FE',
    msTileColor: '#50E3C2'
  },
  devServer: {
    proxy: "http://localhost:334"
  }
};
