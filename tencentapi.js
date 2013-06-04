var user = require('./lib/user'),
    relation = require('./lib/relation');

var TencentAPI = (function() {
  return {
    init: function(appkey, appid) {
      user.init(appkey, appid);
      relation.init(appkey, appid);
    },

    user: user,
    relation: relation
  };
})();

module.exports = TencentAPI;
