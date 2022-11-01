const express = require('express');
const {setAvatar, getAllUser, getUser, searchAllUser} = require('../controllers/userController');
const router =  express.Router();


//edit project
router.post("/setAvatar/:id", setAvatar);
//get user
router.get("/all", getAllUser)
router.get("/search", searchAllUser)

router.get('/friends',)

router.get("/one/:id", getUser)
//search User

module.exports = router;