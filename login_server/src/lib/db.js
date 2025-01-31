// db.js
const { Sequelize, DataTypes } = require('sequelize');


//process.env.jwtSecret

/*

process.env.DB_HOST=localhost
process.env.DB_PORT=5432
process.env.DB_NAME=mydb
process.env.DB_USER=myuser
process.env.DB_PASSWORD=mypassword


*/


const sequelize = new Sequelize({
  dialect: 'postgres',
  host:     process.env.DB_HOST, //'localhost', // change this to your DB host
  username: process.env.DB_USER, //'username', // your PostgreSQL username
  password: process.env.DB_PASSWORD, //'password', // your PostgreSQL password
  database: process.env.DB_PASSWORD, //'dbname', // your database name
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