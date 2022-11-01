const express = require("express");
const {
  addFriends,
  getFriends,
  AcceptFriend,
  unfriend,
  getUserFriends,
} = require("../controllers/friendController");
const router = express.Router();

//auth
router.post("/add", addFriends);
router.post("/accept", AcceptFriend);
router.post("/unfriends", unfriend);
router.get("/all/:id", getUserFriends);
router.get("/get/:id", getFriends);

module.exports = router;
