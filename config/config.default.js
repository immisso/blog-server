/* eslint valid-jsdoc: "off" */

'use strict';

const { USERNAME, PASSWORD, PORT, HOST, DATABASE } = require('./secret');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586057841215_9419';

  // add your middleware config here
  config.middleware = [ 'auth' ];

  config.auth = {
    enable: true,
    ignore: [
      '/api/categories',
      '/api/login',
      '/api/register',
      '/api/articles',
      '/api/hot',
      '/api/detail',
      '/api/comments',
      '/api/tags',
      '/api/toursit/comment',
    ],
  };

  config.sequelize = {
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
    },
    database: DATABASE,
    host: HOST,
    port: PORT,
    username: USERNAME,
    password: PASSWORD,
    logging: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    onerror: {
      all(err, ctx) {
        ctx.status = 200;
        ctx.body = { status: err.status, message: err.message };
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
