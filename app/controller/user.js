/*
 * @Author: 柒叶
 * @Date: 2020-05-06 07:32:26
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-08 05:41:46
 */

'use strict';

const jwt = require('jsonwebtoken');
const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');
const { generatePassWord } = require('../lib/tool_helper');
const { SECRET, EXPIRES } = require('../../config/secret');

class User extends Controller {
  async login() {
    const { ctx } = this;
    ctx.validate({
      email: 'string',
      password: 'string',
    });
    const { password } = ctx.request.body;
    const user = await ctx.service.user.findUser(ctx.request.body);
    if (!user) ctx.throw(500, '该用户不存在或者已经被删除');
    if (generatePassWord(password) !== user.password) { ctx.throw(500, '密码不正确，请重新输入'); }
    const token = jwt.sign({ id: user.id }, SECRET, {
      expiresIn: EXPIRES,
    });
    console.log('11111111111111111111111111111111');
    console.log(token);
    ctx.cookies.set('_token', token, {
      encrypt: true, // 加密传输
    });
    ctx.body = Success(200, 'Success');
  }

  async register() {
    const { ctx } = this;
    ctx.validate({
      email: 'string',
      password: 'string',
      repassword: 'string',
    });
    let status = 400;
    const user = await ctx.service.user.findUser(ctx.request.body);
    if (!user) {
      await ctx.service.user.register(ctx.request.body);
      status = 200;
    }
    ctx.body = Success(status, 'Success');
  }
}

module.exports = User;
