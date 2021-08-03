/* eslint-disable no-console  */
/* eslint-disable global-require  */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const modelsPath = path.join(__dirname, '/models');
const {
    POSTGRES: {
        port,
        host,
        dialect,
        username,
        database,
        password,
    },

} = require('../config');

const basename = path.basename(__filename);

const db = {};
const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect,
    // timezone: '+04:00',
    // logging: process.env.NODE_MODE === 'development',
    logging: console.log,
});
fs
    .readdirSync(modelsPath)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        // eslint-disable-next-line import/no-dynamic-require
        const model = require(path.join(__dirname, 'models', file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });
const modelNames = [];
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
        modelNames.push(db[modelName]);
    }
});
sequelize.query = async function () {
    try {
        // proxy this call
        // eslint-disable-next-line prefer-rest-params
        return Sequelize.prototype.query.apply(this, arguments);
    } catch (err) {
        // handle it with sentry

        // rethrow error
        throw err;
    }
};
sequelize.authenticate()
    .then(() => {
        console.log('\x1b[32m%s\x1b[0m', 'Postgres: Successfully connected to Database');
    })
    .catch((err) => {
        console.log(err);
        throw err;
    });


db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
