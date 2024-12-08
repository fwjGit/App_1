const { Controller } = require("egg");

class ChatController extends Controller {
  // 聊天室
  async chat() {
    const { ctx, app } = this;
    if (!ctx.websocket) {
      throw new Error("this function can only be use in websocket router");
    }
    const { userName } = app.config.verifyToken;
    const socketId = ctx.request.url.split("=")[1];
    const socket = ctx.websocket;
    let room = ctx.helper.room;
    room[socketId] = socket;

    // 每次有新用户加入时，向房间内所有人发送在线人数
    for (let key in room) {
      let socket = room[key];
      const length = Object.keys(room).length;
      socket.send(JSON.stringify({ length }));
    }

    ctx.websocket
      .on("message", (msg) => {
        console.log("receive", msg);
        // 房间内没有除自己外其他socket时，关闭socket连接
        // if (Object.keys(room).length === 1 && room[socketId]) {
        //   room[socketId].close();
        //   return;
        // }

        // 向除自己外的 socket 发送消息
        for (let key in room) {
          if (key !== socketId) {
            let socket = room[key];
            socket.send(
              JSON.stringify({
                msg,
                userName,
              })
            );
          }
        }
      })
      .on("close", (code, reason) => {
        console.log("websocket closed", code, reason);
        delete room[socketId];

        // 每次有新用户退出时，向房间内所有人发送在线人数
        for (let key in room) {
          let socket = room[key];
          const length = Object.keys(room).length;
          socket.send(JSON.stringify({ length }));
        }
      });
  }
}

module.exports = ChatController;
