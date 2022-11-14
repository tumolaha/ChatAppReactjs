const mongoose = require("mongoose");

const friendModule = require("../model/friendModel");
const userSchema = require("../schemas/userSchema");
const addFriends = async (req, res) => {
  try {
    const { from, to } = req.query;
    console.log(from , to);
    await userSchema.updateOne(
      { _id: from },
      { $push: { friends: { user: to, status: 1 } } }
    );

    await userSchema.updateOne(
      { _id: to },
      { $push: { friends: { user: from, status: 2 } } }
    );
    return res.json({
      status: true,
      message: "add friends success",
      user:{

      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const AcceptFriend = async (req, res) => {
  try {
    const { from, to } = req.query;
    await userSchema.updateOne(
      {
        _id: from,
        "friends.user": to,
      },
      {
        $set: {
          "friends.$.status": 3,
        },
      }
    );
    await userSchema.updateOne(
      {
        _id: to,
        "friends.user": from,
      },
      {
        $set: {
          "friends.$.status": 3,
        },
      }
    );

    return res.json({
      status: true,
      message: "recept friends success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};
const unfriend = async (req, res) => {
  try {
    const { from, to } = req.query;
    await userSchema.updateOne(
      {
        _id: from,
      },
      {
        $pull: {
          friends: {
            user: to,
          },
        },
      }
    );
    await userSchema.updateOne(
      {
        _id: to,
      },
      {
        $pull: {
          friends: {
            user: from,
          },
        },
      }
    );

    return res.json({
      status: true,
      message: "unfriends success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};
const getUserFriends = async (req, res) => {
  try {
    const id = req.params.id;
    let listFriends = await userSchema.findOne({ _id: id },{friends: 1}).
    populate({
      path: "friends",
      populate: { path: "user" },
    });
    // delete listFriends.friends.user.password;
    return res.json({ status: true, data: listFriends.friends });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err });
  }
};

const getFriends = async (req, res) => {};

module.exports = {
  addFriends,
  getFriends,
  AcceptFriend,
  unfriend,
  getUserFriends,
};
