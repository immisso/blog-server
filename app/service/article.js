/*
 * @Author: 柒叶
 * @Date: 2020-04-10 07:04:23
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-02 19:56:59
 */

'use strict';
const Service = require('egg').Service;
// const { generatePassWord } = require('../lib/tool_helper');

class Article extends Service {
  async articles({ page, pageSize }) {
    const { count, rows } = await this.ctx.model.Article.findAndCountAll({
      where: { status: 1 },
      offset: (parseInt(page) - 1) * parseInt(pageSize),
      limit: parseInt(pageSize),
      order: [[ 'createdAt', 'DESC' ]],
      attributes: [ 'view', 'title', 'like', 'id', 'comment', 'cover', 'createdAt' ],
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
          attributes: [ 'id', 'username', 'email', 'nickname' ],
        },
      ],
    });
    return { count, articles: rows };
  }
  async hots() {
    return this.ctx.model.Article.findAll({
      order: [[ 'view', 'DESC' ]],
      limit: 10,
      attributes: [ 'view', 'title', 'like', 'id', 'comment' ],
    });
  }
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

  // async comments({ id }) {
  //   return this.ctx.model.Comment.findAll({
  //     where: { article_id: id },
  //     include: [
  //       {
  //         model: this.ctx.model.User,
  //         as: 'user',
  //         attributes: [
  //           'id',
  //           'username',
  //           'email',
  //           'nickname',
  //           'total_view',
  //           'total_like',
  //           'total_comment',
  //           'profession',
  //           'avatar',
  //         ],
  //       },
  //     ],
  //   });
  // }


  async deleteArticle(id) {
    return this.ctx.model.Article.update({
      status: 2,
    }, {
      where: { id },
    });
  }

}

module.exports = Article;
