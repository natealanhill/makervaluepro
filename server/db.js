const Sequelize = require('sequelize');
const sequelize = new Sequelize('mvpdb','postgres','password', {
    host: 'localhost',
    dialect: 'postgres'

});

sequelize.authenticate().then(
    function () {
        console.log ('connect to mvpdb');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;
