const { Service } = require("egg");

class UserService extends Service {
  // 添加用户
  async addUser({ userName, password }) {
    try {
      const result = await this.app.mysql.insert("user", {
        userName,
        password,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 查询用户
  async findUser(userName) {
    try {
      const result = await this.app.mysql.query(
        "select * from user where userName = ?",
        [userName]
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = UserService;
