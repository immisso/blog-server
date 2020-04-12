/*
 * @Author: 柒叶
 * @Date: 2020-04-10 07:04:07
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-13 07:50:34
 */
'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class ArticleController extends Controller {
  async detail() {
    const { ctx } = this;
    ctx.validate(
      {
        id: { type: 'id' },
      },
      ctx.query
    );
    const detail = await ctx.service.article.detail(ctx.query);
    ctx.body = Success(200, 'Success', detail);
  }

  async comments() {
    const { ctx } = this;
    ctx.validate(
      {
        id: { type: 'id' },
      },
      ctx.query
    );
    const comments = await ctx.service.article.comments(ctx.query);
    ctx.body = Success(200, 'Success', comments);
  }

  async toursitComment() {
    const { ctx } = this;
    ctx.validate(
      {
        email: { type: 'email' },
        nickname: { type: 'string' },
        website: { type: 'url' },
        content: { type: 'string' },
        article_id: { type: 'string' },
      }
    );
    const createComment = await ctx.service.article.createToursitComment(ctx.request.body);
    ctx.body = Success(200, 'Success', createComment);
  }

  async tags() {
    const { ctx } = this;
    ctx.body = Success(200, 'Success', await ctx.model.Tag.findAll());
  }
}

module.exports = ArticleController;
