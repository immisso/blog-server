/*
 * @Author: 柒叶
 * @Date: 2020-04-10 07:04:07
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-13 17:06:31
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
    const [ comment ] = await Promise.all([
      ctx.service.comment.createToursitComment(ctx.request.body),
      ctx.service.user.commentPlusOne(author),
      ctx.service.article.commentPlusOne(article_id),
    ]);
    ctx.body = Success(200, 'Success', comment);
  }

  async createComment() {
    const { ctx } = this;
    ctx.validate(
      {
        content: { type: 'string' },
        article_id: { type: 'string' },
        author: { type: 'int' },
      }
    );
    const { id: uid } = ctx.locals;
    const { author, article_id } = ctx.request.body;
    const [ comment ] = await Promise.all([
      ctx.service.comment.createComment(ctx.request.body, uid),
      ctx.service.user.commentPlusOne(author),
      ctx.service.article.commentPlusOne(article_id),
    ]);
    ctx.body = Success(200, 'Success', comment);
  }

  async tags() {
    const { ctx } = this;
    ctx.body = Success(200, 'Success', await ctx.service.tag.tags());
  }

  async updateFavorite() {
    const { ctx } = this;
    ctx.validate({
      id: 'id',
      author: 'int',
    });
    const { id: favorite_id } = ctx.locals;
    const { id: article_id, author } = ctx.request.body;
    const favortie = await ctx.service.favortie.findOne(favorite_id, article_id);
    if (!favortie) {
      await Promise.all([
        ctx.service.favortie.create({ favorite_id, article_id }),
        ctx.service.article.favoritePlusOne(article_id),
        ctx.service.user.favoritePlusOne(author),
      ]);
    } else {
      if (favortie.status === 2) {
        await Promise.all([
          ctx.service.favortie.update(favortie.id, 1),
          ctx.service.article.favoritePlusOne(article_id),
          ctx.service.user.favoritePlusOne(author),
        ]);
      }
      if (favortie.status === 1) {
        await Promise.all([
          ctx.service.favortie.update(favortie.id, 2),
          ctx.service.article.favoriteReduceOne(article_id),
          ctx.service.user.favoriteReduceOne(author),
        ]);
      }
    }
    ctx.body = Success(200, 'Success');
  }
  async isFavorite() {
    const { ctx } = this;
    ctx.validate({ id: 'id' }, ctx.query);
    const { id: like_id } = ctx.locals;
    const { id: article_id } = ctx.query;
    const favorite = await ctx.service.favortie.findOne(like_id, article_id, 1);
    ctx.body = Success(200, 'Success', favorite !== null);
  }
}

module.exports = ArticleController;
