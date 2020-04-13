/*
 * @Author: 柒叶
 * @Date: 2020-04-07 11:12:11
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-11 18:46:39
 */

'use strict';
const Service = require('egg').Service;

class Home extends Service {
  async categories() {
    return this.ctx.model.Category.findAll({
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tags',
        },
      ],
    });
  }
  async articles() {
    return this.ctx.model.Article.findAll({
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
  }
  async hots() {
    return this.ctx.model.Article.findAll({
      order: [[ 'view', 'DESC' ]],
      limit: 10,
      attributes: [ 'view', 'title', 'like', 'id', 'comment' ],
    });
  }
}

module.exports = Home;
