/*
 * @Author: 柒叶
 * @Date: 2020-05-10 12:05:50
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-10 20:29:24
 */

'use strict';
module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const Favorite = app.model.define('favorites', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    article_id: {
      type: INTEGER,
      allowNull: false,
    },
    like_id: {
      type: INTEGER,
      allowNull: false,
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常,2->删除',
    },
  });
  Favorite.associate = () => {
    app.model.Favorite.belongsTo(app.model.Article, { as: 'article' });
  };
  return Favorite;
};
