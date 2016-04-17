var https = require('https');
var querystring = require('querystring');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

var botAPIKey = 'KEY';

var sendMessage = function(chatid, text) {
    var post_data = querystring.stringify({
    	'chat_id': chatid,
    	'text': text
    });

    var post_options = {
          hostname: 'api.telegram.org',
          port: 443,
          path: '/bot'+botAPIKey+'/sendMessage',
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': post_data.length
          }
    };

    var post_req = https.request(post_options);
    post_req.write(post_data);
    post_req.end();
};

exports.handler = function(event, context) {
    dynamodb.scan({
        "TableName": "chats"
    }, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        else {
            data.Items.forEach(function(item) {
                console.log(item.chat_id.S, item.text.S);
                sendMessage(item.chat_id.S, item.text.S);
            });
        }
    });
};
