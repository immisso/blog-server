'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/categories', controller.home.categories);
  router.get('/api/articles', controller.home.articles);
};
