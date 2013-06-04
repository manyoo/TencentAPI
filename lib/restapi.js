var request = require('request'),
    querystring = require('querystring'),
    crypto = require('crypto');

var base_url = 'http://openapi.tencentyun.com',
    base_url_test = 'http://119.147.19.43',
    required = ['openid', 'openkey', 'pf'];

function sign(method, appkey, options) {
  var uri_encoded = encodeURIComponent(method),
      keys = [],
      keyvalues = [],
      params_encoded = null,
      source = null,
      secret = null,
      digest = null;

  for (var k in options) {
    keys.push(k);
  }
  keys.sort();

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    keyvalues.push(key + '=' + options[key]);
  }
  params_encoded = encodeURIComponent(keyvalues.join('&'));
  source = ['GET', uri_encoded, params_encoded].join('&');
  secret = appkey + '&';
  return crypto.createHmac('sha1', secret).update(source).digest().toString('base64');
}

function build_url(method, options) {
  return base_url + method + '?' + querystring.stringify(options);
}

exports.remote_call = function(method, appkey, options, callback) {
  var url = '';

  for (var i = required.length - 1; i >= 0; i--) {
    var f = required[i];
    if (!options.hasOwnProperty(f)) {
      callback({
        error: true,
        message: 'Field ' + f + ' is required for this API.'
      });
      return;
    }
  }
  options.sig = sign(method, appkey, options);
  url = build_url(method, options);
  request({uri: url, json: true}, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      if (body.ret === 0) {
        callback({
          error: false,
          data: body
        });
      } else {
        callback({
          error: true,
          message: body.msg
        });
      }
    } else {
      callback({
        error: true,
        message: 'HTTP Error: ' + error
      });
    }
  });
};
