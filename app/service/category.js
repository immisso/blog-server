/*
 * @Author: 柒叶
 * @Date: 2020-05-01 15:01:08
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-01 15:29:24
 */

'use strict';
const Service = require('egg').Service;

class Category extends Service {
  async categories() {
    return this.ctx.model.Category.findAll({
      where: { status: 1 },
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tags',
        },
      ],
    });
  }

  async createCategory(data) {
    return this.ctx.model.Category.create(data);
  }

  async deleteCategory(id) {
    return this.ctx.model.Category.update({
      status: 2,
    }, {
      where: { id },
    });
  }
}

module.exports = Category;
