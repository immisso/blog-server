/*
 * @Author: 柒叶
 * @Date: 2020-04-07 11:12:11
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-08 06:38:16
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
    return this.ctx.model.Article.findAll();
  }
}

module.exports = Home;
