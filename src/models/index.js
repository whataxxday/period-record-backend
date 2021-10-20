let db = require('./_dbs').db();
const DataTypes = require('sequelize');
/**
 * 我们系统中的表
 */
let Periods = require('./Periods')(db, DataTypes);
module.exports = {
    Periods: Periods
};
