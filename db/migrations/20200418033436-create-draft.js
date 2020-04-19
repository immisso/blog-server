'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('drafts', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: null,
        comment: '文章标题',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      markdown: {
        type: Sequelize.TEXT,
        defaultValue: null,
        comment: 'markdown内容',
      },
      article_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: '字数',
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: '1->正常,2->删除',
      },
      category_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      tag_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }).then(() => queryInterface.addIndex('drafts', [ 'status' ]));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('drafts');
  },
};
