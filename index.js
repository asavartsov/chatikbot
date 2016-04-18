var ScheduleHandler = require("./handlers/ScheduleHandler")
  , EchoHandler = require('./handlers/EchoHandler');
  
var echo = new EchoHandler();
var schedule = new ScheduleHandler();

exports.echoHandler = echo.handle.bind(echo);
exports.scheduleHandler = schedule.handle.bind(schedule);