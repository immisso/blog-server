/*
 * @Author: 柒叶
 * @Date: 2020-04-06 07:32:07
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-08 06:10:07
 */

'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class HomeController extends Controller {
  async categories() {
    const { ctx } = this;
    ctx.body = Success(200, 'Success', await ctx.service.category.categories());
  }
  async articles() {
    const { ctx } = this;
    ctx.validate(
      {
        page: { type: 'string' },
        pageSize: { type: 'string' },
        category: { type: 'string', allowEmpty: true, required: false },
        tag: { type: 'string', allowEmpty: true, required: false },
      },
      ctx.query
    );
    const articles = await ctx.service.article.articles(ctx.query);
    ctx.body = Success(200, 'Success', articles);
  }
  async hot() {
    const { ctx } = this;
    const hot = await ctx.service.article.hots();
    ctx.body = Success(200, 'Success', hot);
  }
}

module.exports = HomeController;
