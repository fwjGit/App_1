module.exports = function (option, app) {
  return async function verifyToken(ctx, next) {
    try {
      const {
        request: { headers },
      } = ctx;
      const token = headers?.authorization || "";
      const result = app.jwt.verify(token, app.config.jwt.secret);
      if (result) {
        option.userName = result.userName;
        await next();
      } else {
        ctx.body = {
          code: 401,
          msg: "token过期，请重新登录",
        };
      }
    } catch (error) {
      ctx.body = {
        code: 401,
        msg: "token校验失败",
      };
    }
  };
};
