const express = require('express');
const controllers = require('../controllers/furnitureControllers')
const { checkError } = require('../controllers/helpers')

const router = express.Router();

router.get('/', checkError(controllers.getAll));
router.post('/', controllers.upload, controllers.create);
router.get('/:id', checkError(controllers.getById));
router.put('/:id', checkError(controllers.update));
router.delete('/:id', checkError(controllers.remove));



module.exports = router;