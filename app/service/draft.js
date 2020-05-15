/*
 * @Author: 柒叶
 * @Date: 2020-05-11 17:23:12
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-15 10:45:25
 */

'use strict';
const Service = require('egg').Service;


class Draft extends Service {
  async draft({ id }) {
    return this.ctx.model.Draft.findOne({ where: { id } });
  }

  async drafts(uid) {
    return this.ctx.model.Draft.findAll({
      where: { uid },
      attributes: [ 'id', 'title', 'updatedAt' ],
    });
  }

  async createDraft(params, uid) {
    return this.ctx.model.Draft.create({ ...params, uid });
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
