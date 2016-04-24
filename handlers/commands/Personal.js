function Personal() {
  this.name = 'Упоминания людей'; 
  this.description = 'Если видит чье-то имя, то отвечает за человека';
  this.help = {};
}

Personal.prototype.respond = function (isDirect, text) {
    if (/влад/i.test(text)) {
        return "Влад занят";
    }
    
    if (/антон/i.test(text)) {
      return "Антон наливет";
    }
    
    if (/вадим/i.test(text)) {
        return "Вадим еще кота не завел";
    }
    
    if (/миша/i.test(text)) {
        return "Миша картинку не вернул";
    }
    
    if (/л[её]ша/i.test(text)) {
        return "Леша забыл";
    }
    
    if (/яндекс/i.test(text)) {
        return text.replace(/яндекс/i, "Гугл") + "\r\n*FTFY";
    }
    
    if (/амазон/i.test(text)) {
        return "Амазон скоро вас всех заменит";
    }
};

module.exports = Personal;