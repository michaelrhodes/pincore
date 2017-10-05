var jsonp = require('jsonp')
var enc = encodeURIComponent
var keys = Object.keys

module.exports = pincore

function pincore (config) {
  config = config || {}

  var root = 'https://{env}api.pin.net.au/{version}'
    .replace('{env}', config.production ? '' : 'test-')
    .replace('{version}', config.version || 1)

  var key = config.key

  return function prepare (path, cb) {
    var part = path.split(/\s+/)
    var method = part[1] ? part[0] : 'GET'
    var url = root + (part[1] || part[0])

    return typeof cb == 'function' ?
      request(cb) :
      request

    function request (body, cb) {
      if (typeof body == 'function')
        cb = body, body = {}

      body._method = method
      body.publishable_api_key = key
      jsonp(url + '.json' + qs(body), then)
      
      function then (err, json) {
        err ? cb(err) : json && json.error ?
        cb(new Error(json.error_description), json) :
        cb(null, json)
      }
    }
  }
}

function qs (obj) {
  return '?' + keys(obj).map(function (key) {
    return [].concat(obj[key]).map(function (val) {
      return enc(key) + '=' + enc(val)
    }).join('&')
  }).join('&')
}
