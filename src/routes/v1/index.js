const express = require('express');

const UserController = require('../../controllers/user-controllers');

const router = express.Router();

router.post('/signup',UserController.create);
router.post('/signin',UserController.signin);
router.delete('/users/:id',UserController.destroy)
router.post('/users/:id',UserController.get);

module.exports = router;