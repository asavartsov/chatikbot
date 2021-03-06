var _ = require('lodash');

function Talk() {
  this.name = 'Искусственный интеллект';
  this.description = 'Общается разными фразочками с тем, кто ему пишет';
  this.help = {};
  this.words = ["хз", "да пох", "и чо?", "что ты несешь?", "ну офигеть теперь!", "нет", "сам такой",
    "лол", "http://stylegifpic.com/wp-content/uploads/2015/07/Serious-cat.jpg", ":-)", 
    "закрой глаза, сосчитай до 10, отвернись от экрана и пойди погуляй",
    "ты не мог бы немного помолчать?", "не скажу", "лучше кота заведи", "...", "¯\\\_(ツ)\_/¯", "бла-бла-бла"]
}

Talk.prototype.respond = function (isDirect, text, message) {
  if (isDirect) {
    var who = message.from.first_name || "Человек";

    if (text) {
      return who + ', ' + _.sample(this.words);
    }
    else {
      return who + '?';
    }
  }
}

module.exports = Talk;
