
'use strict';
const { generatePassWord } = require('../../app/lib/tool_helper');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        username: 'user1',
        password: generatePassWord('user1'),
        email: 'user1@xx.com',
        nickname: '用户一',
        avatar: '../../app/public/avatar/001.png',
        profession: '前端工程师',
      },
      {
        username: 'user2',
        password: generatePassWord('user2'),
        email: 'user2@xx.com',
        nickname: '用户二',
        avatar: '../../app/public/avatar/002.png',
        profession: 'Node工程师',
      },
      {
        username: 'user3',
        password: generatePassWord('user3'),
        email: 'user3@xx.com',
        nickname: '用户三',
        avatar: '../../app/public/avatar/003.png',
        profession: '后端工程师',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
