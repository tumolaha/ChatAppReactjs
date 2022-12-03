const userModel = require("../model/userModel");

const setAvatar = async (req, res) => {

    
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
