/*
 * @Author: 柒叶
 * @Date: 2020-04-10 07:04:07
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-04 15:56:55
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
    const [ , detail ] = await Promise.all([
      ctx.service.article.viewPlusOne(ctx.query.id),
      ctx.service.article.detail(ctx.query),
    ]);
    await ctx.service.user.viewPlusOne(detail.user.id);
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
    const comments = await ctx.service.comment.comments(ctx.query);
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
        author: { type: 'int' },
      }
    );

    const { author, article_id } = ctx.request.body;
    const [ createComment ] = await Promise.all([
      ctx.service.comment.createToursitComment(ctx.request.body),
      ctx.service.user.commentPlusOne(author),
      ctx.service.article.commentPlusOne(article_id),
    ]);
    ctx.body = Success(200, 'Success', createComment);
  }

  async tags() {
    const { ctx } = this;
    ctx.body = Success(200, 'Success', await ctx.service.tag.tags());
  }
}

module.exports = ArticleController;
