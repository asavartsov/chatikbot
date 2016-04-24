var request = require('request')
  , Promise = require('promise');

function Boobs() {
  this.name = 'Сиськи';
  this.description = 'Присылает случайные сиськи из раздела "Шум" на oboobs';
  this.help = { 'сиськи': 'случайные сиськи' };
}

Boobs.prototype.respond = function (isDirect, text) {
  if (isDirect) {
    if (/сиськи/i.test(text)) {
      return new Promise(function (resolve, reject) {
        request('http://api.oboobs.ru/noise/1', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var boob = JSON.parse(body);
            resolve("http://media.oboobs.ru/" + boob[0].preview);
          }
          else {
            reject(error);
          }
        });
      });
    }
  }
};

module.exports = Boobs;