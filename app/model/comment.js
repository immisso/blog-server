/*
 * @Author: 柒叶
 * @Date: 2020-04-07 10:45:40
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-12 18:33:39
 */

'use strict';

module.exports = app => {
  const { INTEGER, TEXT } = app.Sequelize;
  const Comment = app.model.define('comments', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    article_id: {
      type: INTEGER,
      allowNull: false,
    },
    content: {
      type: TEXT,
      defaultValue: null,
      comment: '评论内容',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常,2->删除',
    },
  });
  Comment.associate = () => {
    app.model.Comment.belongsTo(app.model.User, { as: 'user' });
    app.model.Comment.belongsTo(app.model.Article, { as: 'article' });
  };
  return Comment;
};

