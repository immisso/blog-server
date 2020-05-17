/*
 * @Author: 柒叶
 * @Date: 2020-05-06 07:32:26
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-15 12:42:29
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
    if (generatePassWord(password) !== user.password) {
      ctx.throw(500, '密码不正确，请重新输入');
    }
    const token = jwt.sign(
      { uid: user.id, email: user.email, type: user.account_type },
      SECRET,
      { expiresIn: EXPIRES }
    );
    ctx.cookies.set('_token', token, {
      encrypt: true, // 加密传输
      maxAge: EXPIRES * 1000,
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

  async account() {
    const { ctx } = this;
    const { uid, exp } = ctx.locals;
    const user = await ctx.service.user.queryUserById(uid);
    user.dataValues.exp = exp;
    ctx.body = Success(200, 'Success', user);
  }

  async logout() {
    const { ctx } = this;
    ctx.cookies.set('_token', null);
    ctx.body = Success(200, 'Success');
  }

  async updateAccount() {
    const { ctx } = this;
    ctx.validate({
      email: { type: 'string', allowEmpty: true, required: false },
      nickname: { type: 'string', allowEmpty: true, required: false },
      profession: { type: 'string', allowEmpty: true, required: false },
      summary: { type: 'string', allowEmpty: true, required: false },
      website: { type: 'string', allowEmpty: true, required: false },
      github: { type: 'string', allowEmpty: true, required: false },
      gitee: { type: 'string', allowEmpty: true, required: false },
      weibo: { type: 'string', allowEmpty: true, required: false },
    });
    const { uid } = ctx.locals;
    await ctx.service.user.updateAccount(ctx.request.body, uid);
    const user = await ctx.service.user.queryUserById(uid);

    ctx.body = Success(200, 'Success', user);
  }
}

module.exports = User;
