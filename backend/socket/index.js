const socketIo = require("socket.io");

const SocketServer = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", async (user) => {
      console.log("New user joined", user.firstName);
    });
  });
};

module.exports = SocketServer;
