'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        name: '文学',
        en_name: 'literature',
      },
      {
        name: '艺术',
        en_name: 'art',
      },
      {
        name: '后端',
        en_name: 'backend',
      },
      {
        name: '前端',
        en_name: 'frontend',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
