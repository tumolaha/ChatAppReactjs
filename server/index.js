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
//url
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
    origin: "http://localhost:3000",
    credentials: true,
  },
});
//socket io
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("add-user", (userId) => {
    if (userId) {
      onlineUsers.set(userId, socket.id);
    }
  });

  socket.on("send-message", (data) => {
    const sendUserSocket = onlineUsers.get(data.receiverId);
    socket.to(sendUserSocket).emit("message-receiver", {
      sender: data.sender,
      receiverId: data.receiverId,
      message: data.message,
    });
  });

  socket.on("start typing message", (data) => {
    let sendUserSocket;
    if (data.sender) {
        sendUserSocket = onlineUsers.get(data.sender._id);
    }
    io.to(sendUserSocket).emit("start typing message", data);
  });
  socket.on("stop typing message", (data) => {
    let sendUserSocket;
    if (data.sender) {
        sendUserSocket = onlineUsers.get(data.sender._id);
    }
    io.to(sendUserSocket).emit("stop typing message", data);
  });
});
