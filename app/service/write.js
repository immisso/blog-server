/*
 * @Author: 柒叶
 * @Date: 2020-04-18 18:23:10
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-27 13:49:30
 */

'use strict';
const Service = require('egg').Service;

class Write extends Service {
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

  async createPublish(params) {
    const { markdown, title, html, selectedTag, selectedCategory, coverImageUrl } = params;
    return this.ctx.model.Article.create({
      content_mark: markdown,
      title,
      content_html: html,
      tag_id: selectedTag,
      category_id: selectedCategory,
      cover: coverImageUrl,
      user_id: 1,
    });
  }

  async updatePublish(params) {
    const { id, markdown, title, html, selectedTag, selectedCategory } = params;
    return this.ctx.model.Article.update(
      {
        content_mark: markdown,
        title,
        content_html: html,
        tag_id: selectedTag,
        category_id: selectedCategory,
      },
      {
        where: { id },
      }
    );
  }
}

module.exports = Write;
