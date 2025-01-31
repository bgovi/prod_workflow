// db.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', // change this to your DB host
  username: 'username', // your PostgreSQL username
  password: 'password', // your PostgreSQL password
  database: 'dbname', // your database name
});

const User = sequelize.define('User', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        oauthId: {
            type: DataTypes.STRING,
            unique: true,
        },
    }//,
);

sequelize.sync();

module.exports = { sequelize, User };