var _ = require('lodash');

function Start() {
    
}

Start.prototype.respond = function (isDirect, text, message) {
    if (text == "/start") {
        return  "Привет! Мои команды:\r\nбот, говори <текст> - отправка текста " + 
                "каждый день в 22:12 MSK в текущий чат\r\n" +
                "бот, хватит - перестать отправлять текст.\r\n" + 
                "бот, кота - показать случайного котика\r\n\r\n" + 
                "https://media.amazonwebservices.com/blog/2007/big_pbaws_logo_300px.jpg";
    }
}

module.exports = Start;