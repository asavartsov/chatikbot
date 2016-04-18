var _ = require('lodash');

function Start() {
    this.words = ["хз", "да пох", "и чо?", "что ты несешь?", "ну офигеть теперь!", "нет", "сам такой",
                  "лол", "http://stylegifpic.com/wp-content/uploads/2015/07/Serious-cat.jpg", ":-)", 
                  "ты не мог бы немного помолчать?", "не скажу", "лучше кота заведи", "...", "¯\_(ツ)_/¯"]
}

Start.prototype.respond = function (isDirect, text, message) {
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

module.exports = Start;