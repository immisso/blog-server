/*
 * @Author: 柒叶
 * @Date: 2020-05-11 17:23:12
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-11 17:24:26
 */

'use strict';
const Service = require('egg').Service;


class Draft extends Service {
  async draft({ id }) {
    return this.ctx.model.Draft.findOne({ where: { id } });
  }

  async drafts() {
    return this.ctx.model.Draft.findAll({
      where: { user_id: 1 },
      attributes: [ 'id', 'title', 'updatedAt' ],
    });
  }

  async createDraft(params) {
    return this.ctx.model.Draft.create({ ...params, user_id: 1 });
  }

  async updateDraft(params) {
    const { title, markdown, id } = params;
    return this.ctx.model.Draft.update(
      { title, markdown },
      {
        where: { id },
      }
    );
  }

}

module.exports = Draft;
