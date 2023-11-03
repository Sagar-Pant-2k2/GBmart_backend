const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const Auth = require('../middleware/Auth');


router.post('/register', authController.register);
router.post('/login', authController.login);


module.exports = router;
