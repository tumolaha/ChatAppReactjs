const userModel = require("../model/userModel");

const setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    let body = req.body;
    body.isAvatarImageSet = true;
    body.avatarImage = req.body.image;
    const userData = await userModel.editItem(
      {
        id: userId,
        body: body,
      },
      {
        task: "edit",
      }
    );

    return res.json({
      status: true,
      data: {
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const getAllUser = async (req, res) => {
  try {
    let params = [];
    params.keyword = req.query.keyword;
    params.limit = req.query.limit || 10;
    const users = await userModel.listUser(params, { task: "all" });
    return res.json({ status: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error });
  }
};

const getUser = async (req, res) => {
  try {
    let params = [];
    params.id = req.params.id;
    const users = await userModel.listUser(params, { task: "one" });
    return res.json({ status: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error });
  }
};
const searchAllUser = async (req, res) => {
  try {
    let params = [];
    params.keyword = req.query.keyword;
    params.limit = req.query.limit || 10;
    
    const users = await userModel.listUser(params, { task: "all" });
    
    return res.json({ status: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error });
  }
};
module.exports = { setAvatar, getAllUser, getUser, searchAllUser };
