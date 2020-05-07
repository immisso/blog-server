/*
 * @Author: 柒叶
 * @Date: 2020-04-06 13:49:24
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-07 20:33:24
 */

'use strict';
const crypto = require('crypto');
const { SECRET } = require('../../config/secret');


const generatePassWord = str => {
  return crypto.createHmac('sha256', SECRET).update(str).digest('hex');
};


module.exports = { generatePassWord };
