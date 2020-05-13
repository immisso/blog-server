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
  router.get('/api/isFavorite', controller.article.isFavorite);

  router.post('/api/toursit/comment', controller.article.toursitComment);
  router.post('/api/create/comment', controller.article.createComment);
  router.post('/api/update/favorite', controller.article.updateFavorite);

  router.get('/api/draft', controller.write.draft);
  router.get('/api/drafts', controller.write.drafts);

  router.post('/api/create/draft', controller.write.createDraft);
  router.post('/api/update/draft', controller.write.updateDraft);
  router.post('/api/create/publish', controller.write.createPublish);

  router.get('/api/admin/comments', controller.admin.comments);
  router.get('/api/admin/categories', controller.admin.categories);
  router.get('/api/admin/tags', controller.admin.tags);
  router.get('/api/admin/articles', controller.admin.articles);

  router.post('/api/admin/create/category', controller.admin.createCategory);
  router.post('/api/admin/delete/category', controller.admin.deleteCategory);
  router.post('/api/admin/create/tag', controller.admin.createTag);
  router.post('/api/admin/delete/tag', controller.admin.deleteTag);
  router.post('/api/admin/delete/comment', controller.admin.deleteComment);
  router.post('/api/admin/delete/article', controller.admin.deleteArticle);

  router.get('/api/account', controller.user.account);

  router.post('/api/login', controller.user.login);
  router.post('/api/register', controller.user.register);
  router.post('/api/logout', controller.user.logout);
  router.post('/api/update/account', controller.user.updateAccount);

};
