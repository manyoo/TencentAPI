#TencentAPI (a node.js client library for Tencent Open Platform APIs)

Currently, it's still in the early stage and only support basic User and Relation APIs. But it can be extended very easily.

###Installation
Install this library with npm:

	npm install tencentapi

###Usage
Usage is very simple. first, import the module:

	var tencent = require('tencentapi');

Initialize the module with your App Key and App Id:

	tencent.init(appkey, appid);

Now you can call the APIs with corresponding parameters(you need to provide 'openid', 'openkey' and 'pf' at least):

	tencent.user.get_info({openid: '12345', openkey: '12345', pf: 'qzone'},
						   function(result) { console.log(result); });

For each API, you need two parameters: an option object for API parameters and a callback function to process the result. You can check result.error and see if it has any problem. If result.error is true, you can get the error message with result.message. If result.error is false, you can get the API result data with result.data.
