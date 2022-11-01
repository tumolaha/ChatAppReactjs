const express = require('express');
const {addMessageContact, getMessageContact, getMessageGroup, addMessageGroup} = require('../controllers/messageController');
const router =  express.Router();


router.post("/contact/add/", addMessageContact);
router.get("/contact/", getMessageContact);
router.post("/group/add", addMessageGroup);
router.get("/group/get", getMessageGroup);



module.exports = router;