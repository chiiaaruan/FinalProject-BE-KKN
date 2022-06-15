const express = require('express');
const { verifyToken } = require("../middleware/middleware");
const controllers = require('../controllers/adminControllers')
const Login = require('../controllers/authController')
const { checkError } = require('../controllers/helpers')

const router = express.Router();

router.get('/admins', verifyToken , checkError(controllers.getAll));
router.post('/', Login.login);
router.get('/token', Login.refreshAccessToken);
router.delete('/logout', Login.logout);

module.exports = router;
