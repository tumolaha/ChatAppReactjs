const express = require("express");
const { createGroup, getGroupAll, getGroupUser, updateGroup, getGroupSearch } = require("../controllers/groupController");
const router = express.Router();

//auth
router.post("/add", createGroup);
router.get("/all", getGroupAll);
router.get('/list/:id',getGroupUser);
router.post('/update',updateGroup)
router.get('/search',getGroupSearch)

module.exports = router;
