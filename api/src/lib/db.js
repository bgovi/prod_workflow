// db.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host:     process.env.DB_HOST     || 'localhost', //'localhost', // change this to your DB host
  username: process.env.DB_USER     || 'testuser', //'username', // your PostgreSQL username
  password: process.env.DB_PASSWORD || 'testpassword', //'password', // your PostgreSQL password
  database: process.env.DB_NAME     || 'testdb', //'dbname', // your database name
});


const User = sequelize.define('user', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

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
    },
    {
        timestamps: false
    }
);

const Items = sequelize.define('items', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);
// not necessary database created without
// sequelize.sync();
module.exports = { sequelize, User, Items };