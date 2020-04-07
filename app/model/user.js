/*
 * @Author: 柒叶
 * @Date: 2020-04-07 09:16:51
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-07 10:48:54
 */

'use strict';
module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const User = app.model.define('users', {
    id: {
      primaryKey: true,
      type: INTEGER,
    },
    username: {
      type: STRING(50),
      defaultValue: null,
    },
    password: {
      type: STRING(200),
      defaultValue: null,
    },
    email: {
      type: STRING(100),
      defaultValue: null,
    },
    nickname: {
      type: STRING(300),
      defaultValue: null,
    },
    avatar: {
      type: STRING(300),
      defaultValue: null,
    },
    total_view: {
      type: INTEGER,
      defaultValue: 0,
    },
    total_like: {
      type: INTEGER,
      defaultValue: 0,
    },
    total_comment: {
      type: INTEGER,
      defaultValue: 0,
    },
    profession: {
      type: STRING(100),
      defaultValue: null,
    },
    summary: {
      type: TEXT,
      defaultValue: null,
      comment: '用户简介或签名',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常,2->删除',
    },
  });
  User.associate = () => {
    app.model.User.hasMany(app.model.Article);
    app.model.User.hasMany(app.model.Comment);
  };
  return User;
};

