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
    const articles = await ctx.service.home.articles();
    ctx.body = Success(200, 'Success', articles);
  }
}

module.exports = HomeController;
