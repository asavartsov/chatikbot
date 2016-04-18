function Cat() {
    
}

Cat.prototype.respond = function (isDirect, text, message) {
  if (isDirect) {
    if (/ко(та|тика|шку)/i.test(text)) {
        return "http://thecatapi.com/api/images/get?format=src&type=jpg&_="+Math.random();
    }
  }
};

module.exports = Cat;