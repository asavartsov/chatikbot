var ScheduleHandler = require("./handlers/ScheduleHandler")
  , EchoHandler = require('./handlers/EchoHandler');

exports.echoHandler = function (event, context) {
  new EchoHandler(context).handle(event);
};

exports.scheduleHandler = function (event, context) {
  new ScheduleHandler(context).handle(event);
};