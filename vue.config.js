const path = require('path')
module.exports = {
  outputDir: path.resolve(__dirname, './client/'),
  pwa: {
    name: 'Media Manager',
    themeColor: '#fff',
    msTileColor: '#586069'
  },
  devServer: {
    proxy: 'http://localhost:3344'
  },
  pluginOptions: {
    electronBuilder: {
      outputDir: 'build'
    }
  }
}
