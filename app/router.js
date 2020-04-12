'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/categories', controller.home.categories);
  router.get('/api/articles', controller.home.articles);
  router.get('/api/hot', controller.home.hot);
  router.get('/api/detail', controller.article.detail);
  router.get('/api/comments', controller.article.comments);

  router.post('/api/toursit/comment', controller.article.toursitComment);
};
