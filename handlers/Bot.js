var config = require('../config')
  , telegram = require('telegram-bot-api');

module.exports = new telegram({ token: config.bot.token });