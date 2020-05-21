/*
 * @Author: 柒叶
 * @Date: 2020-05-11 17:23:12
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-19 11:14:41
 */

'use strict';
const Service = require('egg').Service;


class Draft extends Service {
  async draft({ id }) {
    return this.ctx.model.Draft.findOne({ where: { id } });
  }

  async drafts(uid) {
    return this.ctx.model.Draft.findAll({
      where: { uid, status: 1 },
      attributes: [ 'id', 'title', 'is_publish', 'updatedAt' ],
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

  async deleteDraft(id) {
    return this.ctx.model.Draft.update({
      status: 2,
    }, {
      where: { id },
    });
  }

  async updatePublishStatus(id) {
    return this.ctx.model.Draft.update(
      { is_publish: 1 },
      {
        where: { id },
      }
    );
  }


}

module.exports = Draft;
