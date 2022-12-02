// const { default: mongoose } = require("mongoose");
const groupModel = require("../model/groupModel");

const createGroup = async (req, res) => {
  try {
    const { name, description, member = [], create } = req.body;
    const data = await groupModel.create({
      nameGroup: name,
      description: description,
      member: [create, ...member],
      create: create,
    });
    if (data)
      return res.json({ status: true, message: "group added successfully." });
    return res.json({
      status: false,
      message: "failed to add group to the database",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error });
  }
};
const getGroupAll = async (req, res) => {
  try {
    const groupList = await groupModel.listGroup({}, { task: "all" });
    return res.json({ status: true, data: { groupList } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};
const getGroupUser = async (req, res) => {
  const idUser = req.params.id;
  try {
    const groupList = await groupModel.listGroup(
      { userId: idUser },
      { task: "user" }
    );
    return res.json({ status: true, data: groupList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};
const updateGroup = async (req, res) => {
  const Group = req.body;
  try {
    await groupModel.editItem(
      {
        id: req.body.id,
        body: {
          nameGroup: Group.nameGroup,
          member: Group.member,
          description: Group.description,
        },
      },
      {
        task: "one",
      }
    );
    return res.json({ status: true, message: "add success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};
module.exports = { createGroup, getGroupAll, getGroupUser, updateGroup };
