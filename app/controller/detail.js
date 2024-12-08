const { Controller } = require("egg");

class DetailController extends Controller {
  // 查询用户名
  async queryUserName() {
    const { ctx, app } = this;
    const { verifyToken } = app.config;
    ctx.body = {
      code: 200,
      msg: "查询成功",
      data: {
        userName: verifyToken.userName,
      },
    };
  }

  // 退出登录
  async logout() {
    const { ctx, app } = this;
    ctx.body = {
      code: 200,
      msg: "已退出登录",
    };
  }

  // 查询路由表
  async getRoutes() {
    const { ctx, app } = this;
    const { userName } = app.config.verifyToken;
    const user = await ctx.service.user.findUser(userName);

    if (user === null) {
      ctx.body = {
        code: 500,
        msg: "服务器错误，请重试",
      };
      return;
    }

    if (user.length == 0) {
      ctx.body = {
        code: 400,
        msg: "无法找到当前用户",
      };
      return;
    }

    const { role } = user[0];
    const result = await ctx.service.role.getRoutes(role);
    if (result === null) {
      ctx.body = {
        code: 500,
        msg: "服务器错误，请重试",
        data: {},
      };
      return;
    }

    if (result.length == 0) {
      ctx.body = {
        code: 400,
        msg: "无法查到路由表信息",
      };
      return;
    }
    const { routes } = result[0];
    ctx.body = {
      code: 200,
      msg: "查询成功",
      data: {
        routes,
      },
    };
  }
}

module.exports = DetailController;
