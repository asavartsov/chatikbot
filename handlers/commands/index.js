var Remind = require('./Remind')
  , Start = require('./Start')
  , Talk = require('./Talk')
  , Cat = require('./Cat')
  , Go = require('./Go');

module.exports = {
  Start: new Start(),
  Remind: new Remind(),
  Cat: new Cat(),
  Go: new Go(),
  Talk: new Talk()
};