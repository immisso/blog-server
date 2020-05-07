/*
 * @Author: 柒叶
 * @Date: 2020-05-04 15:04:35
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-07 17:59:25
 */

'use strict';
const Service = require('egg').Service;
const { literal } = require('sequelize');
const { generatePassWord } = require('../lib/tool_helper');

class User extends Service {
  async register(data) {
    const { email, password } = data;
    return this.ctx.model.User.create({
      email,
      password: generatePassWord(password),
    });
  }
  async login(data) {
    console.log('eeeeeeeeeeeeessssssssssssssss');
    console.log(data);
    return '';
  }
  async findUser(data) {
    const { email } = data;
    return this.ctx.model.User.findOne({
      where: { email, status: 1 },
    });
  }
  async viewPlusOne(id) {
    return this.ctx.model.User.update({
      total_view: literal('total_view + 1'),
    }, {
      where: { id },
    });
  }

  async likePlusOne(id) {
    return this.ctx.model.User.update({
      total_like: literal('total_like + 1'),
    }, {
      where: { id },
    });
  }

  async commentPlusOne(id) {
    return this.ctx.model.User.update({
      total_comment: literal('total_comment + 1'),
    }, {
      where: { id },
    });
  }
}

module.exports = User;
