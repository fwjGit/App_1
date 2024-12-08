/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: "egg-mysql",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  websocket: {
    enable: true,
    package: "egg-websocket-plugin",
    useAppMiddlewares: false, // 禁用app.use()注册的全局中间件
  },
};
