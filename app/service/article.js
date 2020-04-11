/*
 * @Author: 柒叶
 * @Date: 2020-04-10 07:04:23
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-10 21:15:34
 */

'use strict';
const Service = require('egg').Service;

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
          ],
        },
      ],
    });
  }
}

module.exports = Article;
