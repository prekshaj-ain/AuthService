const express = require('express');

const UserController = require('../../controllers/user-controllers');
const { AuthRequestValidator } = require('../../middlewares');

const router = express.Router();

router.post('/signup',AuthRequestValidator.validateUser,UserController.create);
router.post('/signin',AuthRequestValidator.validateUser,UserController.signin);
router.delete('/users/:id',UserController.destroy);
router.get('/isAuthenticated',UserController.isAuthenticated);

module.exports = router;