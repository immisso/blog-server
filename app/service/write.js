/*
 * @Author: 柒叶
 * @Date: 2020-04-18 18:23:10
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-19 10:17:17
 */


'use strict';
const Service = require('egg').Service;

class Write extends Service {

  async draft({ id }) {
    return this.ctx.model.Draft.findOne({ where: { id } });
  }

  async createDraft(params) {
    return this.ctx.model.Draft.create({ ...params, user_id: 1 });
  }

  async updateDraft(params) {
    const { title, markdown, id } = params;
    return this.ctx.model.Draft.update({ title, markdown }, {
      where: { id },
    });
  }
}

module.exports = Write;
