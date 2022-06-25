const { models } = require("../config/dbConfig");
const { getIdParam } = require("../controllers/helpers");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

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

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'rooms',
    format: async (req, file) => 'jpg', // supports promises as well
    public_id: function (req, file) {
      (null, file.originalname); // The file on cloudinary would have the same name as the original file name
    }
  },
});

const uploadCloud = multer({ storage: storage }).single('image');


module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  uploadCloud
};
