/*
 * @Author: 柒叶
 * @Date: 2020-04-05 16:45:46
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-12 18:42:06
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
