function Moar() {
  this.name = 'Еще'; 
  this.description = 'Запоминает последнюю команду и повторяет ее';
  this.help = { 'еще': 'повторить команду' };
}

Moar.prototype.respond = function (isDirect, text, message, context) {
  if (isDirect) {
    if (/^(ещ[её]|моар)$/i.test(text)) {
        if (this.lastCommand) {
            context.text = this.lastCommand;
            context.message.text = this.lastCommand;
        }
        else {
            return "Еще что?"
        }
    }
    else {
        this.lastCommand = text;
    }
  }
};

module.exports = Moar;