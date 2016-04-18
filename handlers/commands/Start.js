var _ = require('lodash');

function Start() {
    this.name = 'Привет'; 
    this.description = 'Отображает приветствие по команде /start или привет';
    this.help = {};
}

Start.prototype.respond = function (isDirect, text, message, context) {
    if (text == "/start" || (isDirect && /привет/i.test(text))) {
        var message = "Привет! Я бот и у меня установлены модули:\r\n\r\n";

        for (var kCmd in context.commands) {
            if (context.commands.hasOwnProperty(kCmd)) {
                var cmd = context.commands[kCmd];
                message = message + '*' + cmd.name + '*\r\n' + cmd.description + '\r\n';
            
                if (cmd.help && Object.keys(cmd.help).length > 0) 
                {
                    message = message + 'Мои команды:\r\n';
                    
                    for (var kHelp in cmd.help) {
                        if (cmd.help.hasOwnProperty(kHelp)) {
                            message = message + "  _бот, " + kHelp + '_: ' + cmd.help[kHelp] + '\r\n';
                        }
                    }
                }
                
                message = message + '\r\n';
            }
        }

        return message;
    }
}

module.exports = Start;