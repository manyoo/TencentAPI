var rest = require('./restapi');

var Relation = (function() {
  var app_key = null,
      app_id = null;

  function build_caller(method) {
    return function(options, callback) {
      options.format = 'json',
      options.appid = app_id;
      rest.remote_call(method, app_key, options, callback);
    };
  }

  return {
    init: function(appkey, appid) {
      app_key = appkey;
      app_id = appid;
    },

    is_friend: build_caller('/v3/relation/is_friend'),
    get_app_friends: build_caller('/v3/relation/get_app_friends'),
    get_rcmd_friends: build_caller('/v3/relation/get_rcmd_friends')
  };
})();

module.exports = Relation;
