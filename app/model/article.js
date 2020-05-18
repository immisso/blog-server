/*
 * @Author: 柒叶
 * @Date: 2020-04-07 10:40:54
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-15 11:26:20
 */

'use strict';


module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const Article = app.model.define('articles', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    title: {
      type: STRING,
      defaultValue: null,
      comment: '文章标题',
    },
    uid: {
      type: INTEGER,
      allowNull: false,
    },
    abstract: {
      type: STRING(500),
      defaultValue: null,
    },
    cover: {
      type: STRING,
      defaultValue: null,
      comment: '封面图片',
    },
    content: {
      type: TEXT,
      defaultValue: null,
      comment: '文本内容',
    },
    html: {
      type: TEXT,
      defaultValue: null,
      comment: 'html内容',
    },
    markdown: {
      type: TEXT,
      defaultValue: null,
      comment: 'markdown内容',
    },
    anchor: {
      type: TEXT,
      defaultValue: null,
      comment: 'anchor',
    },
    article_count: {
      type: INTEGER,
      defaultValue: 0,
      comment: '字数',
    },
    favorite: {
      type: INTEGER,
      defaultValue: 0,
      comment: '点赞数',
    },
    view: {
      type: INTEGER,
      defaultValue: 0,
      comment: '查看数',
    },
    comment: {
      type: INTEGER,
      defaultValue: 0,
      comment: '评论数',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常,2->删除',
    },
    category_id: {
      type: INTEGER,
      allowNull: false,
    },
    tag_id: {
      type: INTEGER,
      allowNull: false,
    },
  });
  Article.associate = () => {
    app.model.Article.hasMany(app.model.Comment, { as: 'comments' });
    app.model.Article.hasMany(app.model.Favorite);
    app.model.Article.belongsTo(app.model.User, { as: 'user', foreignKey: 'uid' });
    app.model.Article.belongsTo(app.model.Category, { as: 'category' });
    app.model.Article.belongsTo(app.model.Tag, { as: 'tag' });
  };
  return Article;
};
