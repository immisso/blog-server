'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        name: '随笔',
        en_name: 'essay',
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
