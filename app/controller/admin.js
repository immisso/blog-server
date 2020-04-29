/*
 * @Author: 柒叶
 * @Date: 2020-04-29 17:30:18
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-29 17:47:35
 */

'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class AdminController extends Controller {
  async articles() {
    const { ctx } = this;
    ctx.validate(
      {
        page: { type: 'string' },
        pageSize: { type: 'string' },
      },
      ctx.query
    );

    const articles = await ctx.service.home.articles(ctx.query);
    ctx.body = Success(200, 'Success', articles);
  }
  async comments() {
    const { ctx } = this;
    const comments = await ctx.service.comment.comments();
    ctx.body = Success(200, 'Success', comments);
  }
}

module.exports = AdminController;
