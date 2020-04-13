
'use strict';
const { generatePassWord } = require('../../app/lib/tool_helper');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        username: 'user1',
        password: generatePassWord('user1'),
        email: 'user1@xx.com',
        nickname: '壹叶',
        avatar: 'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/001.png',
        profession: '前端工程师',
        website: 'http://www.immisso.com',
        github: 'https://github.com/immisso/blog-server',
        gitee: 'https://gitee.com/misso',
      },
      {
        username: 'user2',
        password: generatePassWord('user2'),
        email: 'user2@xx.com',
        nickname: '贰叶',
        avatar: 'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/002.png',
        profession: 'Node工程师',
        website: 'http://www.immisso.com',
        github: 'https://github.com/immisso/blog-web',
        gitee: 'https://gitee.com/misso',
      },
      {
        username: 'user3',
        password: generatePassWord('user3'),
        email: 'user3@xx.com',
        nickname: '叁叶',
        avatar: 'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/003.png',
        profession: '后端工程师',
        website: 'http://www.immisso.com',
        github: 'https://github.com/immisso',
        gitee: 'https://gitee.com/misso',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
