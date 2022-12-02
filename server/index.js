const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./src/routes/authRouter");
const userRouter = require("./src/routes/userRouter");
const messageRouter = require("./src/routes/messageRouter");
const friendRouter = require("./src/routes/friendRouter");
const groupRouter = require("./src/routes/groupRouter");

const app = express();
const socket = require("socket.io");
const userSchema = require("./src/schemas/userSchema");
const { on } = require("./src/schemas/userSchema");

const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.use(cors());

app.use(express.json());
// app.use(express.urlencoded());

//connection mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });
app.get("/", (req, res) => {
  res.send("Hello, World: ");
});
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/friends", friendRouter);
app.use("/api/groups", groupRouter);

const server = app.listen(PORT, () =>
  console.log("server running on port " + PORT)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3001",
    credentials: true,
  },
});
//socket io
global.onlineUsers = new Map();

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId == userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  socket.on("add-user", (userId) => {
    if (userId) {
      onlineUsers.set(userId, socket.id);
      //online user
      addUser(userId, socket.id);
      io.emit("get-online-user", users);
    }
  });

  socket.on("send-message", (data) => {
    const sendUserSocket = onlineUsers.get(data.userData.receiverId);
    socket.to(sendUserSocket).emit("message-receiver", {
      sender: data.userData.sender,
      receiverId: data.userData.receiverId,
      message: data.userData.message,
    });
  });

  socket.on("start typing message", (data) => {
    let sendUserSocket;
    if (data.sender) {
      sendUserSocket = onlineUsers.get(data.sender._id);
    }
    socket.to(sendUserSocket).emit("start typing message", data);
  });
  socket.on("stop typing message", (data) => {
    let sendUserSocket;
    if (data.sender) {
      sendUserSocket = onlineUsers.get(data.sender._id);
    }
    socket.to(sendUserSocket).emit("stop typing message", data);
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("get-online-user", users);
  });
});
