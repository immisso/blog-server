/*
 * @Author: 柒叶
 * @Date: 2020-04-29 17:30:18
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-01 17:55:33
 */

'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class AdminController extends Controller {
  async articles() {
    const { ctx } = this;
    ctx.validate(
      {
        page: { type: 'string' },
        pageSize: { type: 'string' },
      },
      ctx.query
    );

    const articles = await ctx.service.home.articles(ctx.query);
    ctx.body = Success(200, 'Success', articles);
  }
  async comments() {
    const { ctx } = this;
    const comments = await ctx.service.comment.comments();
    ctx.body = Success(200, 'Success', comments);
  }

  async categories() {
    const { ctx } = this;
    const categories = await ctx.service.category.categories();
    ctx.body = Success(200, 'Success', categories);
  }

  async createCategory() {
    const { ctx } = this;
    ctx.validate({
      name: { type: 'string' },
      en_name: { type: 'string' },
    });
    const category = await ctx.service.category.createCategory(ctx.request.body);
    ctx.body = Success(200, 'Success', category);
  }

  async deleteCategory() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'int' },
    });
    const { id } = ctx.request.body;
    await ctx.service.category.deleteCategory(id);
    ctx.body = Success(200, 'Success', { id });
  }

  async tags() {
    const { ctx } = this;
    const tags = await ctx.service.tag.tags();
    ctx.body = Success(200, 'Success', tags);
  }

  async createTag() {
    const { ctx } = this;
    ctx.validate({
      category_id: { type: 'int' },
      name: { type: 'string' },
      en_name: { type: 'string' },
    });
    const tag = await ctx.service.tag.createTag(ctx.request.body);
    ctx.body = Success(200, 'Success', tag);
  }

  async deleteTag() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'int' },
    });
    const { id } = ctx.request.body;
    await ctx.service.tag.deleteTag(id);
    ctx.body = Success(200, 'Success', { id });
  }
}

module.exports = AdminController;
