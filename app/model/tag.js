/*
 * @Author: 柒叶
 * @Date: 2020-04-07 10:39:17
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-07 12:07:37
 */

'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Tag = app.model.define('tags', {
    id: {
      primaryKey: true,
      type: INTEGER,
    },
    name: {
      type: STRING(50),
      defaultValue: null,
    },
    en_name: {
      type: STRING(50),
      defaultValue: null,
    },
    category_id: {
      type: INTEGER,
      allowNull: false,
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常,2->删除',
    },
  });
  Tag.associate = () => {
    app.model.Tag.belongsTo(app.model.Category, { as: 'category' });
    app.model.Tag.hasMany(app.model.Article, { as: 'article' });
  };
  return Tag;
};
