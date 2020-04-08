'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tags', [
      {
        name: '散文',
        en_name: 'prose',
        category_id: 1,
      },
      {
        name: 'Node',
        en_name: 'node',
        category_id: 2,
      },
      {
        name: 'Egg',
        en_name: 'egg',
        category_id: 2,
      },
      {
        name: 'React',
        en_name: 'react',
        category_id: 3,
      },
      {
        name: 'Python',
        en_name: 'python',
        category_id: 2,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', null, {});
  },
};
