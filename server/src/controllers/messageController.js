const messageSchema = require("../schemas/messageSchema");

const addMessageContact = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageSchema.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({status: true, message: "Message added successfully." });
    return res.json({status: false,  message: "failed to add message to the database" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
const getMessageContact = async (req, res) => {
  try {
    const { from, to } = req.query;

    const messages = await messageSchema.find({
      users: {
        $all: [from, to],
      },
      groups: null,
    }).sort({ updatedAt: 1 }).populate( {path:"sender",select: '_id avatarImage username'});
    res.json({status: true, data: messages});
  } catch (error) {
    console.log(error);
    res.status(500).json({status: false, message: error });
  }
};
const addMessageGroup = async (req, res) => {
  try {
    const {groupId, sender, users,  message } = req.body;
    const data = await messageSchema.create({
      
      message: { text: message },
      users: users,
      groups: groupId,
      sender: sender,
    });

    if (data) return res.json({status: true, message: "Message added successfully." });
    return res.json({status: false,  message: "failed to add message to the database" });
  } catch (error) {
    console.log(error);
    res.status(500).json({status: false, message: error });
  }
};
const getMessageGroup = async (req, res) => {
  try {
    const { from, groupId } = req.query;

    const messages = await messageSchema.find({
      // users: {
      //   $all: [from],
      // },
      groups: groupId,
    }).sort({ updatedAt: 1 }).populate( {path:"sender",select: '_id avatarImage username'});
    res.json({status: true, data: messages});
  } catch (error) {
    console.log(error);
    res.status(500).json({status: false, message: error });
  }
};
module.exports = { addMessageContact, getMessageContact, addMessageGroup, getMessageGroup };
