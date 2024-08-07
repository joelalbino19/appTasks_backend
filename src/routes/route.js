const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.get('/userById', userController.userById);
router.get('/users', userController.users);

module.exports = router;