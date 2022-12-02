const express = require("express");
const { createGroup, getGroupAll, getGroupUser, updateGroup } = require("../controllers/groupController");
const router = express.Router();

//auth
router.post("/add", createGroup);
router.get("/all", getGroupAll);
router.get('/list/:id',getGroupUser);
router.post('/update',updateGroup)

module.exports = router;
