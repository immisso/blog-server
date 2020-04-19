/*
 * @Author: 柒叶
 * @Date: 2020-04-18 18:24:21
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-19 11:18:23
 */

'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class WriteController extends Controller {

  async draft() {
    const { ctx } = this;
    ctx.validate(
      {
        id: { type: 'id' },
      },
      ctx.query
    );
    const draft = await ctx.service.write.draft(ctx.query);
    ctx.body = Success(200, 'Success', draft);
  }

  async createDraft() {
    const { ctx } = this;
    ctx.validate(
      {
        title: { type: 'string' },
        markdown: { type: 'string' },
      }
    );
    const draft = await ctx.service.write.createDraft(ctx.request.body);
    ctx.body = Success(200, 'Success', draft);
  }

  async updateDraft() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'id' },
      title: { type: 'string' },
      markdown: { type: 'string' },
    });
    await ctx.service.write.updateDraft(ctx.request.body);
    ctx.body = Success(200, 'Success');
  }
}

module.exports = WriteController;
