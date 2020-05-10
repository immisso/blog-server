/*
 * @Author: 柒叶
 * @Date: 2020-04-10 07:04:07
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-10 20:32:15
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

  async updateFavorite() {
    const { ctx } = this;
    ctx.validate({
      id: 'id',
      author: 'int',
    });
    console.log('666666666666666666666');
    const { id: like_id } = ctx.locals;
    const { id: article_id, author } = ctx.request.body;
    const favortie = await ctx.service.favortie.findOne(like_id, article_id);
    if (!favortie) {
      await ctx.service.favortie.create({ like_id, article_id });
      console.log('eeeeeeeeeeeeeeeeeeeeeee');
      console.log(article_id);
      const result = await ctx.service.article.favoritePlusOne(article_id);
      console.log(result);
      await ctx.service.user.likePlusOne(author);
    }
    if (favortie.status === 2) {
      await ctx.service.favortie.update(favortie.id, 1);
      await ctx.service.article.likePlusOne(article_id);
      await ctx.service.user.likePlusOne(author);
    }
    await ctx.service.favortie.update(favortie.id, 1);
    await ctx.service.article.favoriteReduceOne(article_id);
    await ctx.service.user.likeReduceOne(author);
    ctx.body = Success(200, 'Success');
  }
}

module.exports = ArticleController;
