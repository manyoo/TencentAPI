var rest = require('./restapi');

var User = (function() {
  var app_key = null,
      app_id = null;

  function build_caller(method) {
    return function(options, callback) {
      options.format = 'json';
      options.appid = app_id;
      rest.remote_call(method, app_key, options, callback);
    };
  }

  return {
    init: function(appkey, appid) {
      app_key = appkey;
      app_id = appid;
    },

    get_info: build_caller('/v3/user/get_info'),
    get_multi_info: build_caller('/v3/user/get_multi_info'),
    total_vip_info: build_caller('/v3/user/total_vip_info'),
    is_vip: build_caller('/v3/user/is_vip'),
    friends_vip_info: build_caller('/v3/user/friends_vip_info'),
    is_setup: build_caller('/v3/user/is_setup'),
    is_login: build_caller('/v3/user/is_login'),
    is_area_login: build_caller('/v3/user/is_area_login')
  };
})();

module.exports = User;
