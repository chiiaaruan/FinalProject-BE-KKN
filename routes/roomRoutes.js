const express = require('express');
const controllers = require('../controllers/roomControllers')
const { checkError } = require('../controllers/helpers')
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: controllers.fileStorageEngine });

router.get('/', checkError(controllers.getAll));
router.post('/', checkError(controllers.create));
router.get('/:id', checkError(controllers.getById));
router.put('/:id', checkError(controllers.update));
router.delete('/:id', checkError(controllers.remove));

router.post("/single", upload.single("image"), (req, res) => {
    console.log(req.file);
    res.send("Single FIle upload success");
  });
  

module.exports = router;