var AWS = require('aws-sdk')
  , dynamodb = new AWS.DynamoDB()
  , Promise = require('promise')
  , Bot = require('../Bot');

function ScheduleHandler(context) {
  this.context = context;
}

ScheduleHandler.prototype.getMessages = function (callback) {
  return new Promise(function (resolve, reject) {
    dynamodb.scan({
      "TableName": "chats"
    }, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        resolve(data.Items.map(function (item) {
          return { chat_id: item.chat_id.S, text: item.text.S };
        }));

      }
    });
  }).nodeify(callback);
};

ScheduleHandler.prototype.handle = function (event) {
  this.getMessages()
    .then(function (messages) {
      messages.forEach(function (message) {
        Bot.sendMessage({ chat_id: message.chat_id, text: message.text });
      });
    })
    .catch(this.context.fail);
};

module.exports = ScheduleHandler;