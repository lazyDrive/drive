/** @format */

'use strict'

module.exports = User => {
  User.upload = (req, res, body, cb) => {
    console.log(req)
    console.log(body)
    console.log(res)

    return { a: 'a' }
  }

  User.remoteMethod('upload', {
    description: 'Uploads a file',
    accepts: [
      { arg: 'req', type: 'object', http: { source: 'req' } },
      { arg: 'res', type: 'object', http: { source: 'res' } },
      { arg: 'body', type: 'object', http: { source: 'body' } }
    ],
    returns: {
      arg: 'fileObject',
      type: 'object',
      root: true
    },
    http: { verb: 'post' }
  })
}
