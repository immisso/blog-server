/*
 * @Author: 柒叶
 * @Date: 2020-04-29 17:41:41
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-15 10:42:18
 */

'use strict';
const Service = require('egg').Service;
const { generatePassWord } = require('../lib/tool_helper');

class Comment extends Service {
  async comments(query) {
    const where = { status: 1 };
    if (query) where.article_id = query.id;
    return this.ctx.model.Comment.findAll({
      where,
      include: [
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [
            'id',
            'username',
            'email',
            'nickname',
            'total_view',
            'total_like',
            'total_comment',
            'profession',
            'avatar',
          ],
        },
        {
          model: this.ctx.model.Article,
          as: 'article',
          attributes: [ 'view', 'title', 'favorite', 'id', 'comment' ],
        },
      ],
    });
  }

  async deleteComment(id) {
    return this.ctx.model.Comment.update(
      {
        status: 2,
      },
      {
        where: { id },
      }
    );
  }

  async createToursitComment(params) {
    const { email, nickname, website } = params;
    let user = await this.ctx.model.User.findOne({
      where: { email: params.email },
    });
    if (!user) {
      user = await this.ctx.model.User.create({
        email,
        nickname,
        website,
        account_type: 'TOURIST',
        password: generatePassWord(params.email),
      });
    }
    const result = await this.ctx.model.Comment.create({
      ...params,
      uid: user.id,
    });
    const comment = await this.ctx.model.Comment.findOne({
      where: { id: result.id },
      include: [
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [
            'id',
            'username',
            'email',
            'nickname',
            'total_view',
            'total_like',
            'total_comment',
            'profession',
            'avatar',
          ],
        },
      ],
    });
    return comment;
  }

  async createComment(params, uid) {
    const result = await this.ctx.model.Comment.create({
      ...params,
      uid,
    });

    const comment = await this.ctx.model.Comment.findOne({
      where: { id: result.id },
      include: [
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [
            'id',
            'username',
            'email',
            'nickname',
            'total_view',
            'total_like',
            'total_comment',
            'profession',
            'avatar',
          ],
        },
      ],
    });
    return comment;
  }
}

module.exports = Comment;
