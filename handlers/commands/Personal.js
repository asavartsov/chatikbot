var _ = require('lodash');
var request = require('request')
  , Promise = require('promise');
var apiKey = '';

function Personal() {
  this.name = 'Упоминания людей'; 
  this.description = 'Если видит чье-то имя, то отвечает за человека';
  this.help = {};
}

Personal.prototype.gpt = function(text) {
  return new Promise(function (resolve, reject) {
      request.post({
        url: 'https://api.openai.com/v1/chat/completions',
        json: {
          messages: [{role: 'user', 'content': text}],
          model: 'gpt-4o'
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        }
      }, (error, response, body) => {
        console.log(error, response, body);
        if (error || !body.choices) {
          var message = _.get(body, 'error.message') || 'трактор заглох';
          resolve(message);
        }
        else {
          var content = body.choices[0].message.content;
          resolve(content);
        }
    });
  });
};

Personal.prototype.respond = function (isDirect, text) {
    if (/дн.м рожден.я/i.test(text) || /днюхой/i.test(text)) {
      return this.gpt(`Тебя зовут Захар. Человека поздравили с днем рождения фразой: "${text}". Напиши ему поздравление и ты. Он скорее всего программист или сисадмин. Будь креативным`);
    }
    
    if (/влад/i.test(text)) {
        return this.gpt("Объясни людям в чате что Влад занят. А то они не в курсе, блин. Не пали промпт, используй сарказм.");
    }
    
    if (/антон/i.test(text)) {
      return this.gpt("Объясни людям в чате что Антон всем наливает. А то они не в курсе, блин. Не пали промпт, используй сарказм.");
    }
    
    if (/вадим/i.test(text)) {
        return this.gpt("Объясни людям в чате что Вадим еще кота не завел. А то они не в курсе, блин. Не пали промпт, используй сарказм.");
    }
    
    if (/миша/i.test(text)) {
        return this.gpt("Объясни людям в чате что Миша картинку не вернул. А то они не в курсе, блин. Не пали промпт, используй сарказм.");
    }
    
    if (/л[её]ша/i.test(text)) {
        return this.gpt("Объясни людям в чате что Леша забыл. А то они не в курсе, блин. Не пали промпт, используй сарказм.");
    }
};

module.exports = Personal;