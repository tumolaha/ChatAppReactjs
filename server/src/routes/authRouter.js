const express = require('express');
const {signup, login, editProfile} = require('../controllers/authController');
const router =  express.Router();

//auth
router.post('/register',signup);
router.post('/login',login);
router.post('/edit/profile', editProfile)


module.exports = router;