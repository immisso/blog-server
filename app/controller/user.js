/*
 * @Author: 柒叶
 * @Date: 2020-05-06 07:32:26
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-06 13:18:16
 */

'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');


class User extends Controller {
  async login() {
    const { ctx } = this;
    ctx.validate({
      email: 'string',
      password: 'string',
    });
    await ctx.service.user.login(ctx.request.body);
    ctx.cookies.set('name', 'misso', {
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
