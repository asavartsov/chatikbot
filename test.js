var sinon = require('sinon')
  , mockery = require('mockery')
  , chai = require('chai')
  , should = chai.should()
  , expect = chai.expect;
  
  

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

ev.message.text = "бот, сиськи";
echo.handle(ev, {}, console.log);

ev.message.text = "бот, покажи кота";
echo.handle(ev, {}, console.log);

ev.message.text = "/start";
echo.handle(ev, {}, console.log);

ev.message.text = "бот, хватит";
echo.handle(ev, {}, console.log);

ev.message.text = "бот?";
echo.handle(ev, {}, console.log);

ev.message.text = "бот, заткнись";
echo.handle(ev, {}, console.log);

return;

function Message () {
  this.update_id = 0;
  this.message = {
    "message_id": 234234234,
    "from": {
      "id": 123456789,
      "first_name": "Тест",
      "last_name": "Тестов"
    },
    "chat": {
      "id": 123456789,
      "first_name": "Тест",
      "last_name": "Тестов",
      "type": "private"
    },
    "date": 1460762669,
    "text": "текст"
  };
}

describe('Index Module', function(){
  var index = require('./index');
  
  it ('shoud have echoHandler', function () {
    expect(index).itself.to.respondTo('echoHandler');
  });
  
  it ('shoud have scheduleHandler', function () {
    expect(index).itself.to.respondTo('scheduleHandler');
  });
});
