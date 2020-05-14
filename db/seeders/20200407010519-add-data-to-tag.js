'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tags', [
      {
        name: '古文',
        en_name: 'prose',
        category_id: 1,
      },
      {
        name: '诗歌',
        en_name: 'poetry',
        category_id: 1,
      },
      {
        name: '插画',
        en_name: 'inbetweening',
        category_id: 2,
      },
      {
        name: '测试',
        en_name: 'test',
        category_id: 2,
      },
      {
        name: 'Node',
        en_name: 'node',
        category_id: 3,
      },
      {
        name: 'Egg',
        en_name: 'egg',
        category_id: 3,
      },
      {
        name: 'Python',
        en_name: 'python',
        category_id: 3,
      },
      {
        name: 'React',
        en_name: 'react',
        category_id: 4,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', null, {});
  },
};
