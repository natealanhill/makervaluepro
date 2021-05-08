const Sequelize = require('sequelize');
const sequelize = new Sequelize('mvpdb', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'

});

sequelize.authenticate().then(
    function () {
        console.log('connect to mvpdb');
    },
    function (err) {
        console.log(err);
    }
);

User = sequelize.import('./models/user');
RawGood = sequelize.import('./models/rawGood');
FinishedGood = sequelize.import('./models/finishedGood');
BOM = sequelize.import('./models/BOM');
TimeValue = sequelize.import('./models/timeValue');

User.hasMany(RawGood);
RawGood.belongsTo(User);

User.hasOne(TimeValue);
TimeValue.belongsTo(User);

FinishedGood.hasOne(BOM);
BOM.belongsTo(FinishedGood);

BOM.hasMany(RawGood);

RawGood.belongsTo(BOM);

User.hasMany(BOM);
BOM.belongsTo(User);

module.exports = sequelize;
