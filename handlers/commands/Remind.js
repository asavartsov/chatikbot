var AWS = require('aws-sdk')
  , dynamodb = new AWS.DynamoDB()
  , Promise = require('promise');

function Remind() {
  this.name = 'Напоминание'; 
  this.description = 'Управляет фиксированным напоминнанием в чат, которое приходит в 22:12 по московскому времени';
  this.help = { 
    'говори <текст>': 'Установить напоминанием <текст>', 
    'хватит': 'Перестать напоминать', 
  };
}

var _ok = function(text) {
  return function () {
    return text;
  }
}

Remind.prototype.addChatMessage = function (chatid, text) {
  return new Promise(function (resolve, reject) {
    dynamodb.putItem({
      "TableName": "chats",
      "Item": {
        "chat_id": { "S": chatid.toString() },
        "text": { "S": text.toString() }
      }
    }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

Remind.prototype.removeChatMessage = function (chatid) {
  return new Promise(function (resolve, reject) {
    dynamodb.deleteItem({
      "TableName": "chats",
      "Key": { "chat_id": { "S": chatid.toString() } }
    }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

Remind.prototype.respond = function (isDirect, text, message) {
  if (isDirect) {
    if (/^говори\ .+/i.test(text)) {
      var textToAdd = text.substring(6).trim();

      if (textToAdd) {
        return this.addChatMessage(message.chat.id, textToAdd).then(_ok("Хорошо"));
      }
      else {
        return "Офигел? Где текст?";
      }
    }

    if (/^хватит$/.test(text)) {
      return this.removeChatMessage(message.chat.id).then(_ok("Ладно"));
    }
  }
};

module.exports = Remind;
