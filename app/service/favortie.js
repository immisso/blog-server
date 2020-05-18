/*
 * @Author: 柒叶
 * @Date: 2020-05-10 16:06:32
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-11 13:07:08
 */

'use strict';
const Service = require('egg').Service;

class Favorite extends Service {
  async update(id, status) {
    return this.ctx.model.Favorite.update({ status }, { where: { id } });
  }
  async create(params) {
    return this.ctx.model.Favorite.create(params);
  }
  async findOne(favorite_id, article_id, status = null) {
    const where = { favorite_id, article_id };
    if (status) where.status = status;
    return this.ctx.model.Favorite.findOne({ where });
  }
}

module.exports = Favorite;
