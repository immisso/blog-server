'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class HomeController extends Controller {
  async categories() {
    const { ctx } = this;
    ctx.body = Success(200, 'Success', await ctx.service.home.categories());
  }
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
  async hot() {
    const { ctx } = this;
    const hot = await ctx.service.home.hots();
    ctx.body = Success(200, 'Success', hot);
  }
}

module.exports = HomeController;
