/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/logout", controller.detail.logout);
  router.get("/queryUserName", controller.detail.queryUserName);
  router.get("/getRoutes", controller.detail.getRoutes);
};
