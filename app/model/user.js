/*
 * @Author: 柒叶
 * @Date: 2020-04-07 09:16:51
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-18 12:26:13
 */

'use strict';
module.exports = app => {
  const { STRING, INTEGER, TEXT, ENUM } = app.Sequelize;
  const User = app.model.define('users', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
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
    website: {
      type: STRING(300),
      defaultValue: null,
      comment: '个人网址',
    },
    github: {
      type: STRING(300),
      defaultValue: null,
      comment: 'github地址',
    },
    gitee: {
      type: STRING(300),
      defaultValue: null,
      comment: 'gitee地址',
    },
    weibo: {
      type: STRING(300),
      defaultValue: null,
      comment: '微博',
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
    account_type: {
      type: ENUM('ADMIN', 'GENERAL', 'TOURIST'),
      defaultValue: 'GENERAL',
    },
  });
  User.associate = () => {
    app.model.User.hasMany(app.model.Article);
    app.model.User.hasMany(app.model.Comment);
    app.model.User.hasMany(app.model.Draft);
  };
  return User;
};

