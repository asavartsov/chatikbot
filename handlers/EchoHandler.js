var Promise = require('promise')
  , config = require('../config')
  , commands = require('./commands')
  , Bot = require('./Bot');

function EchoHandler() {
}

EchoHandler.prototype.reply = function (chat_id, text) {
  if (text) {
    console.log('Ответ: ' + text);
    return Bot.sendMessage({ chat_id: chat_id, text: text });
  }
}

EchoHandler.prototype.handle = function (event, context, callback) {
  var message = event.message;
  var text = message.text;
  var meMatch = /^бот([\s\.\-\:;!?,]+|$)/i;
  var isDirect = !!(message.reply_to_message && event.message.reply_to_message.from.id == config.bot.id);

  if (meMatch.test(message.text)) {
    isDirect = true;
    text = message.text.replace(meMatch, '');
  }

  console.log({ isDirect: isDirect, text: text });
  context.commands = commands;

  for (var key in commands) {
    var result = commands[key].respond(isDirect, text, message, context);

    if (result instanceof Promise) {
      result
        .then(function (response) {
          if (response) {
            console.log("Ответ: " + response);
            Bot.sendMessage({ chat_id: message.chat.id, text: response });
            callback(null, true);
          }
        })
        .catch(function (err) {
          console.log("Ошибка: " + err);
          Bot.sendMessage({ chat_id: message.chat.id, text: "Хрень какая-то" + err ? ", " + err : "" });
          callback(err);
        });
    }
    else if (result) {
      console.log("Ответ: " + result);
      Bot.sendMessage({ chat_id: message.chat.id, text: result, parse_mode: 'Markdown' });
      callback(null, true);
    }
    
    if (result) break;
  }
};

module.exports = EchoHandler;
