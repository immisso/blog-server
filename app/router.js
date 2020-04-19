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
  router.get('/api/tags', controller.article.tags);
  router.get('/api/draft', controller.write.draft);

  router.post('/api/toursit/comment', controller.article.toursitComment);
  router.post('/api/create/draft', controller.write.createDraft);
  router.post('/api/update/draft', controller.write.updateDraft);
};
