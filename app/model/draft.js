/*
 * @Author: 柒叶
 * @Date: 2020-04-18 12:22:27
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-18 18:42:02
 */

'use strict';
module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const Draft = app.model.define('drafts', {
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
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    markdown: {
      type: TEXT,
      defaultValue: null,
      comment: 'markdown内容',
    },
    article_count: {
      type: INTEGER,
      defaultValue: 0,
      comment: '字数',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常,2->删除',
    },
    category_id: {
      type: INTEGER,
      defaultValue: null,
    },
    tag_id: {
      type: INTEGER,
      defaultValue: null,
    },
  });
  Draft.associate = () => {
    app.model.Draft.belongsTo(app.model.User, { as: 'user' });
  };
  return Draft;
};

