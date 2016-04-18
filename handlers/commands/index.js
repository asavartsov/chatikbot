var Remind = require('./Remind')
  , Start = require('./Start')
  , Talk = require('./Talk')
  , Cat = require('./Cat')
  , Go = require('./Go');

module.exports = [
  new Start(),
  new Remind(),
  new Cat(),
  new Go(),
  new Talk()
];