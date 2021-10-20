'use strict';
let R = require('ramda');
const config = require('../config/db.json');
let Sequelize = require('sequelize');

let database;

// 数据库1 实例
exports.db = function () {
    if (!database) {
        database = new Sequelize(
            config.database,
            config.username,
            config.password,
            R.mergeDeepRight(config.connection, {})
        );
    }
    return database;
};
