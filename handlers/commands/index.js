var Remind = require('./Remind')
  , Personal = require('./Personal')
  , Boobs = require('./Boobs')
  , Start = require('./Start')
  , Talk = require('./Talk')
  , Moar = require('./Moar')
  , Cat = require('./Cat')
  , Go = require('./Go');

module.exports = {
  Moar: new Moar(),
  Start: new Start(),
  Remind: new Remind(),
  Cat: new Cat(),
  Go: new Go(),
  Boobs: new Boobs(),
  Personal: new Personal(),
  Talk: new Talk()
};