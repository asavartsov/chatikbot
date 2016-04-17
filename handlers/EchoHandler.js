var Promise = require('promise')
  , config = require('../config')
  , commands = require('./commands/')
  , Bot = require('../Bot')


var 

function EchoHandler(context) {
  this.context = context;
}

EchoHandler.prototype.handle = function (event) {
  var message = event.message;
  var text = message.text;
  var meMatch = /^бот(\W+|$)/i;
  var isDirect = message.reply_to_message && event.message.reply_to_message.from.id == config.bot.id;
  
  if (meMatch.test(message.text)) {
    isDirect = true;
    text = message.text.replace(meMatch, '');
  }
  
  commands.forEach(function(command) {
    command.respond(isDirect, text, message)
    .then(function (response) {
        if (response) {
          return Bot.sendMessage({ chat_id: message.chat.id, text: response });
        }
        else {
          return Promise.resolve();
        }
      })
      .catch(function (err) {
        Bot.sendMessage({ chat_id: message.chat.id, text: "Хрень какая-то: " + err }, this.context.fail);
      }.bind(this));
  }, this);
};

module.exports = EchoHandler;