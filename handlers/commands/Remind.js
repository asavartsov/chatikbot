var AWS = require('aws-sdk')
  , dynamodb = new AWS.DynamoDB();

var Remind = function () {

}

Remind.prototype.addChatMessage = function (chatid, text, callback) {
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
  }).nodeify(callback);
};

Remind.prototype.removeChatMessage = function (chatid, callback) {
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
  }).nodeify(callback);
};

Remind.prototype.respond = function (isDirect, text, message) {
  if (!isDirect) {
    return;
  }

  if (/^говори/i.test(text)) {
    var textToAdd = text.substring(6).trim();

    if (textToAdd) {
      return this.addChatMessage(message.chat.id, textToAdd).then(function () {
        return "Хорошо";
      });
    }
    else {
      return "Офигел? Где текст?";
    }
  }

  if (/^хватит$/.test(text)) {
    return this.removeChatMessage(message.chat.id).then(function () {
      return "Ладно";
    });
  }
}