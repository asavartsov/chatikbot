var https = require('https');
var querystring = require('querystring');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

var botId = 'ID';
var botAPIKey = 'KEY';
var words = ["хз", "да пох", "и чо?", "что ты несешь?", "ну офигеть теперь!", "нет", "сам такой",
             "лол", "http://stylegifpic.com/wp-content/uploads/2015/07/Serious-cat.jpg", ":-)"];

var sendReply = function(originalMessage, text) {
    var chatid = originalMessage.chat.id;
    var replyto = originalMessage.message_id;
    var from = originalMessage.from;
    var fromName = from.first_name || from.last_name || "Человек";
    sendMessage(chatid, fromName + ", " + text, replyto);
};

var sendMessage = function(chatid, text, replyto) {
    var post_data = querystring.stringify({
    	'chat_id': chatid,
    	'reply_to_message_id': replyto,
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

var addChat = function(context, chatid, text) {
    dynamodb.putItem({
        "TableName": "chats",
        "Item": {
            "chat_id": {
                "S": chatid.toString()
            },
            "text": {
                "S": text.toString()
            }
        }
    }, function(err, data) {
        if (err) {
            context.fail('ERROR: Dynamo failed: ' + err);
        } else {
            console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
        }
    });
};

var removeChat = function(context, chatid) {
    dynamodb.deleteItem({
        "TableName": "chats",
        "Key": {
            "chat_id": {"S": chatid.toString()}
        }
    }, function(err, data) {
        if (err) {
            context.fail('ERROR: Dynamo failed: ' + err);
        } else {
            console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
        }
    });
};

var isNormalInteger = function(str) {
    var n = ~~Number(str);
    return String(n) === str && n >= 0;
};

exports.handler = function(event, context) {
    // console.log("Request received:\n", JSON.stringify(event));

    var msg = event.message.text;
    
    if (/^бот,? хватит/i.test(msg)) {
        removeChat(context, chatid);
        sendReply(event.message, "ладно");
        return;
    }
    
    if (/^бот,? говори/i.test(msg)) {
        var text = msg.substring(6).trim();
        if (text && text.length < 1024) {
            addChat(context, chatid, text);
            sendReply(event.message, "хорошо");
        }
        else {
            sendReply(event.message, "офигел? Где текст?");
        }
        return;
    }
    
    if (msg.startsWith('/start') || /^бот,? привет/i.test(msg)) {
        sendReply(event.message, "привет! Мои команды:\r\nбот, говори <текст> - отправка текста каждый день в 22:12 MSK в текущий чат\r\nбот, хватит - перестать отправлять текст.\r\n\r\nhttps://media.amazonwebservices.com/blog/2007/big_pbaws_logo_300px.jpg");
        return;
    }
    
    if (/через.+плечо/i.test(msg)) {
        sendReply(event.message, "не горячо?", replyto);
        return;
    }
    
    if (/^бот.+(кота|кошку).?/i.test(msg)) {
        sendMessage(event.message.chat.id, "http://thecatapi.com/api/images/get?format=src&type=jpg&_="+Math.random());
        return;
    }
    
    if (/^бот/i.test(msg) && /иди/i.test(msg)) {
        sendReply(event.message, "сам иди");
        return;
    }
    
    if (/^бот[,.!?]?$/i.test(msg.trim())) {
        sendReply(event.message, "что?");
        return;
    }
    
    if (/^бот,?/i.test(msg) || (event.message.reply_to_message && event.message.reply_to_message.from.id == botId)) {
        var word = words[Math.floor(Math.random()*words.length)];
        sendReply(event.message, word);
        return;
    }
}
