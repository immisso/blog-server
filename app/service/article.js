/*
 * @Author: 柒叶
 * @Date: 2020-04-10 07:04:23
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-13 20:33:33
 */

'use strict';
const Service = require('egg').Service;
const { generatePassWord } = require('../lib/tool_helper');

class Article extends Service {
  async detail({ id }) {
    return this.ctx.model.Article.findOne({
      where: { id },
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tag',
        },
        {
          model: this.ctx.model.Category,
          as: 'category',
        },
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
            'github',
            'weibo',
            'website',
            'gitee',
          ],
        },
      ],
    });
  }

  async comments({ id }) {
    return this.ctx.model.Comment.findAll({
      where: { article_id: id },
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
      user_id: user.id,
    });
    console.log(result);
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

module.exports = Article;
