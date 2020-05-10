/*
 * @Author: 柒叶
 * @Date: 2020-05-10 16:06:32
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-10 20:31:32
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
  async findOne(like_id, article_id) {
    return this.ctx.model.Favorite.findOne({ where: { like_id, article_id } });
  }
}

module.exports = Favorite;
