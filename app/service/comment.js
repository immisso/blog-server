/*
 * @Author: 柒叶
 * @Date: 2020-04-29 17:41:41
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-29 17:45:53
 */

'use strict';
const Service = require('egg').Service;

class Comment extends Service {
  async comments(query) {
    const where = {};
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
      ],
    });
  }
}

module.exports = Comment;
