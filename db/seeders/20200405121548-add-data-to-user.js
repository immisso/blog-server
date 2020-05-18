
'use strict';
const { generatePassWord } = require('../../app/lib/tool_helper');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        username: 'qiye',
        password: generatePassWord('qiye@admin.com'),
        email: 'qiye@admin.com',
        nickname: '柒叶',
        avatar: 'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/001.png',
        profession: '全栈工程师',
        website: 'https://www.immisso.com',
        github: 'https://github.com/immisso',
        gitee: 'https://gitee.com/misso',
        account_type: 'ADMIN',
        total_view: 90,
        total_like: 0,
        total_comment: 0,
      },
      {
        username: 'laozi',
        password: generatePassWord('laozi@xx.com'),
        email: 'laozi@xx.com',
        nickname: '老子',
        avatar: 'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/002.png',
        profession: '[春秋]哲学家',
        website: 'http://www.immisso.com',
        github: 'https://github.com/immisso/blog-server',
        gitee: 'https://gitee.com/misso',
        total_view: 5001,
        total_like: 0,
        total_comment: 0,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
