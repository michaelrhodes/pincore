var req = require('simple-get')

module.exports = pincore

function pincore (config) {
  config = config || {}

  var root = 'https://{env}api.pin.net.au/{version}'
    .replace('{env}', config.production ? '' : 'test-')
    .replace('{version}', config.version || 1)

  var headers = {
    Authorization: 'Basic ' + Buffer
      .from(config.key + ':')
      .toString('base64')
  }

  return function prepare (path, cb) {
    var part = path.split(/\s+/)
    var method = part[1] ? part[0] : 'GET'
    var url = root + (part[1] || part[0])

    return typeof cb == 'function' ?
      request(cb) :
      request

    function request (body, cb) {
      if (typeof body == 'function')
        cb = body, body = null

      var opts = {
        method: method,
        url: url,
        headers: headers,
        json: true
      }

      if (body) opts.body = body

      req.concat(opts, function (err, res, json) {
        err ? cb(err) : json && json.error ?
        cb(new Error(json.error_description), json, res) :
        cb(null, json, res)
      })
    }
  }
}
