const { models } = require("../config/dbConfig");
const { getIdParam } = require("../controllers/helpers");
const path = require('path')
const multer = require('multer')

async function getAll(req, res) {
  const rooms = await models.room.findAll();
  res.status(200).json(rooms);
}

async function getById(req, res) {
  const id = getIdParam(req);
  const rooms = await models.room.findOne({
    where: {
      id: id,
    },
  });
  if (rooms) {
    res.status(200).json(rooms);
  } else {
    res.status(404).send("404 - Not found");
  }
}

async function create(req, res) {
  if (!req.file) return res.send('Please upload a file')
  if (req.body.id) {
    res
      .status(400)
      .json({
        error:
          "id should not be provided, since it is determined automatically by the database",
      });
  } else {
    await models.room.create({
      room_name: req.body.roomName,
      image:  req.file.path,
    });
    res.status(201).json({
      success: true,
    });
  }
}

async function update(req, res) {
  const { roomName } = req.body;
  const id = getIdParam(req);
  await models.room.update(
    {
      room_name: roomName,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.status(200).json({ success: true });
}

async function remove(req, res) {
  const id = getIdParam(req);
  await models.room.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).json({ status: "success" });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './images')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
}).single('image')

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  upload,
};
