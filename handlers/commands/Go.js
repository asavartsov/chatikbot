function Go() {
    
}

Go.prototype.respond = function (isDirect, text, message) {
  if (isDirect) {
    if (/иди (на|в)/i.test(text)) {
        return "Сам иди";
    }
  }
};

module.exports = Go;