function Cat() {
  this.name = 'Коты'; 
  this.description = 'Постит случайного котика';
  this.help = { 
    'кота|кошку': 'Случайный котик в чат из The Cat API' 
  };
}

Cat.prototype.respond = function (isDirect, text) {
  if (isDirect) {
    if (/ко(та|шку)/i.test(text)) {
        return "Мяу!\r\n" + "http://thecatapi.com/api/images/get?format=src&type=jpg&_="+Math.random();
    }
  }
};

module.exports = Cat;
