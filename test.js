var config = require('./config');
var EchoHandler = require('./handlers/EchoHandler');

var echo = new EchoHandler();

var ev = {
  "update_id": 000000000,
  "message": {
    "message_id": 0,
    "from": {
      "id": 000000000,
      "first_name": "Тест",
      "last_name": "Тестов"
    },
    "chat": {
      "id": 000000000,
      "first_name": "Тест",
      "last_name": "Тестов",
      "type": "private"
    },
    "date": 1460762669,
    "text": ""
  }
};

ev.message.text = "бот, иди на балет";
echo.handle(ev, {}, console.log);

ev.message.text = "бот, покажи котика";
echo.handle(ev, {}, console.log);

ev.message.text = "/start";
echo.handle(ev, {}, console.log);

ev.message.text = "бот, хватит";
echo.handle(ev, {}, console.log);

ev.message.text = "бот?";
echo.handle(ev, {}, console.log);

ev.message.text = "бот, заткнись";
echo.handle(ev, {}, console.log);