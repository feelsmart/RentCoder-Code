var Sequelize = require('sequelize');

global.connection = global.connection || (new Sequelize('mydb', 'root', '123456aA', {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
}));

global.connection
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });
