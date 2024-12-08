const { Service } = require("egg");

class RoleService extends Service {
  // 查询路由信息
  async getRoutes(role) {
    try {
      const result = await this.app.mysql.query(
        "select * from role where roleName = ?",
        [role]
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = RoleService;
