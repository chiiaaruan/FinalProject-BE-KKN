const express = require('express');
const controllers = require('../controllers/adminControllers')
const { checkError } = require('../controllers/helpers')

const router = express.Router();

router.get('/', checkError(controllers.getAll));
router.post('/', checkError(controllers.create));
router.get('/:id', checkError(controllers.getById));
router.delete('/:id', checkError(controllers.remove));

module.exports = router;