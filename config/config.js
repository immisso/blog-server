/*
 * @Author: 柒叶
 * @Date: 2020-04-05 16:45:46
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-07 20:26:23
 */

'use strict';

const { USERNAME, HOST, PASSWORD, DATABASE } = require('./secret');

module.exports = {
  development: {
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    dialect: 'mysql',
  },

};
