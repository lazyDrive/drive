/** @format */

'use strict'

var loopback = require('loopback')
var path = require('path')
var boot = require('loopback-boot')

var app = (module.exports = loopback())

app.start = function() {
  app.use(loopback.static(path.resolve(__dirname, '../assets')))
  // start the web server
  return app.listen(function() {
    app.emit('started')
    var baseUrl = app.get('url').replace(/\/$/, '')
    console.log('-------------------------------------------------------')
    console.log('Web server listening at: %s', baseUrl)
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath)
      console.log('-------------------------------------------------------')
    }
  })
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err

  // start the server if `$ node server.js`
  if (require.main === module) app.start()
})
