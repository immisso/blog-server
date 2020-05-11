/*
 * @Author: 柒叶
 * @Date: 2020-04-10 07:04:23
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-11 17:27:25
 */

'use strict';
const Service = require('egg').Service;
const { literal } = require('sequelize');
// const { generatePassWord } = require('../lib/tool_helper');

class Article extends Service {
  async articles({ page, pageSize, category, tag }) {
    const where = { status: 1 };
    if (category) where.category_id = category;
    if (tag) where.tag_id = tag;
    const { count, rows } = await this.ctx.model.Article.findAndCountAll({
      where,
      offset: (parseInt(page) - 1) * parseInt(pageSize),
      limit: parseInt(pageSize),
      order: [[ 'createdAt', 'DESC' ]],
      attributes: [
        'view',
        'title',
        'favorite',
        'id',
        'comment',
        'cover',
        'createdAt',
      ],
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tag',
        },
        {
          model: this.ctx.model.Category,
          as: 'category',
        },
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'username', 'email', 'nickname' ],
        },
      ],
    });
    return { count, articles: rows };
  }

  async update(params, id) {
    return this.ctx.model.Article.update(params, { where: { id } });
  }


  async hots() {
    return this.ctx.model.Article.findAll({
      order: [[ 'view', 'DESC' ]],
      limit: 10,
      attributes: [ 'view', 'title', 'favorite', 'id', 'comment' ],
    });
  }

  async detail({ id }) {
    return this.ctx.model.Article.findOne({
      where: { id },
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tag',
        },
        {
          model: this.ctx.model.Category,
          as: 'category',
        },
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [
            'id',
            'username',
            'email',
            'nickname',
            'total_view',
            'total_like',
            'total_comment',
            'profession',
            'avatar',
            'github',
            'weibo',
            'website',
            'gitee',
          ],
        },
      ],
    });
  }

  async deleteArticle(id) {
    return this.ctx.model.Article.update(
      {
        status: 2,
      },
      {
        where: { id },
      }
    );
  }

  async viewPlusOne(id) {
    return this.ctx.model.Article.update(
      {
        view: literal('view + 1'),
      },
      {
        where: { id },
      }
    );
  }

  async favoritePlusOne(id) {
    return this.ctx.model.Article.update(
      {
        favorite: literal('favorite + 1'),
      },
      {
        where: { id },
      }
    );
  }

  async commentPlusOne(id) {
    return this.ctx.model.Article.update(
      {
        comment: literal('comment + 1'),
      },
      {
        where: { id },
      }
    );
  }

  async favoriteReduceOne(id) {
    return this.ctx.model.Article.update(
      {
        favorite: literal('favorite - 1'),
      },
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

module.exports = Article;
