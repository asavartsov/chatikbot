function Go() {
  this.name = 'Сам иди'; 
  this.description = 'В ответ на указание боту следовать куда-то предлагает идти самому';
  this.help = {};
}

Go.prototype.respond = function (isDirect, text) {
  if (isDirect) {
    if (/иди (на|в)/i.test(text)) {
        return "Сам иди";
    }
    
    if (/заткнись/i.test(text)) {
      return "Сам заткнись :)";
    }
  }
};

module.exports = Go;