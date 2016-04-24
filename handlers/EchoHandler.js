var Promise = require('promise')
  , config = require('../config')
  , commands = require('./commands')
  , Bot = require('./Bot');

function EchoHandler() {
}

EchoHandler.prototype.handle = function (event, context, callback) {
  context.message = event.message;
  context.text = event.message.text;
  var meMatch = /^бот([\s\.\-\:;!?,]+|$)/i;
  var isDirect = !!(event.message.reply_to_message && event.message.reply_to_message.from.id == config.bot.id);

  if (meMatch.test(event.message.text)) {
    isDirect = true;
    context.text = context.message.text.replace(meMatch, '');
  }

  console.log({ isDirect: isDirect, text: context.text });
  context.commands = commands;

  for (var key in commands) {
    var result = commands[key].respond(isDirect, context.text, context.message, context);

    if (result instanceof Promise) {
      result
        .then(function (response) {
          if (response) {
            console.log("Ответ: " + response);
            Bot.sendMessage({ chat_id: context.message.chat.id, text: response }).catch(console.error);
            callback(null, true);
          }
        })
        .catch(function (err) {
          console.log("Ошибка: " + err);
          Bot.sendMessage({ chat_id: context.message.chat.id, text: "Хрень какая-то" + err ? ", " + err : "" });
          callback(err);
        });
    }
    else if (result) {
      console.log("Ответ: " + result);
      Bot.sendMessage({ chat_id: context.message.chat.id, text: result }).catch(console.error);
      callback(null, true);
    }
    
    if (result) break;
  }
};

module.exports = EchoHandler;
