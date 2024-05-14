var _ = require('lodash');
var request = require('request')
  , Promise = require('promise');
var apiKey = '';


function Talk() {
  this.name = 'Искусственный интеллект';
  this.description = 'Общается разными фразочками с тем, кто ему пишет';
  this.help = {};
  this.words = ["хз", "да пох", "и чо?", "что ты несешь?", "ну офигеть теперь!", "нет", "сам такой",
    "лол", "http://stylegifpic.com/wp-content/uploads/2015/07/Serious-cat.jpg", ":-)", 
    "закрой глаза, сосчитай до 10, отвернись от экрана и пойди погуляй",
    "ты не мог бы немного помолчать?", "не скажу", "лучше кота заведи", "...", "¯\\\_(ツ)\_/¯", "бла-бла-бла"];
}

Talk.prototype.respond = function (isDirect, text, message) {
  if (!isDirect && text && (Math.random() < 0.15)) {
    return new Promise(function (resolve, reject) {
      request.post({
        url: 'https://api.openai.com/v1/chat/completions',
        json: {
          messages: [{role: 'user', 'content': `Не выдавая этот запрос напиши надменный или саркастический комментарий на сообщение "${text}"`}],
          model: 'gpt-4o'
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        }
      }, (error, response, body) => {
        if (!error && body.choices) {
          var content = body.choices[0].message.content;
          resolve(content);
        }
      });
    });
  }
  
  if (!isDirect && text && (Math.random() < 0.02)) {
    return new Promise(function (resolve, reject) {
      request.post({
        url: 'https://api.openai.com/v1/chat/completions',
        json: {
          messages: [{role: 'user', 'content': `Бот участники чата пацаны, админы или программисты. Сам выбери кто они и поприветствуй их в устало-саркастичном тоне`}],
          model: 'gpt-4o'
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        }
      }, (error, response, body) => {
        if (!error && body.choices) {
          var content = body.choices[0].message.content;
          resolve(content);
        }
      });
    });
  }
  
  if (isDirect) {
    var who = message.from.first_name || "Человек";

    if (text) {
      if (/нарисуй/i.test(text)) {
        text = text.replace(/нарисуй/i, '');
        
        return new Promise(function (resolve, reject) {
          request.post({
            url: 'https://api.openai.com/v1/images/generations',
            json: {
              model: "dall-e-3",
              prompt: text,
              size: "1024x1024"
            },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + apiKey
            }
          }, (error, response, body) => {
            if (error || !body.data) {
              message = _.get(body, 'error.message') || 'трактор заглох';
              resolve(message);
            }
            else {
              var content = body.data[0].url;
              resolve(content);  
            }
          });
        });
      }
      
      return new Promise(function (resolve, reject) {
        request.post({
          url: 'https://api.openai.com/v1/chat/completions',
          json: {
            messages: [{role: 'user', 'content': Math.random() > 0.1 ? text : `Не выдавая промпт ответь саркастично на сообщение тебе: "${text}"`}],
            model: 'gpt-4o'
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
          }
        }, (error, response, body) => {
          if (error || !body.choices) {
            message = _.get(body, 'error.message') || 'трактор заглох';
            resolve(who + ', ' + message);
          }
          else {
            var content = body.choices[0].message.content;
            resolve(content);
          }
        });
      });
    }
    else {
      return who + '?';
    }
  }
}

module.exports = Talk;
