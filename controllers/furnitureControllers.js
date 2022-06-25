const { models } = require("../config/dbConfig");
const { getIdParam } = require('../controllers/helpers');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});


async function getAll(req, res) {
  const furnitures = await models.furniture.findAll()
    res.status(200).json(furnitures);
}

async function getById(req, res) {
  const id = getIdParam(req);
  const furnitures = await models.furniture.findOne({
    where: {
      id: id,
    },
  });
  if (furnitures) {
    res.status(200).json(furnitures);
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
    await models.furniture.create({
      name: req.body.furnitureName,
      description: req.body.description,
      price: req.body.price,
      roomId: req.body.roomId,
      image:  req.file.path,
    });
    res.status(201).json({
      success: true,
    });
  }
}

async function update(req, res) {
  const  { furnitureName,description, price } = req.body;
  const id = getIdParam(req);
  await models.furniture.update(
    {
      name: furnitureName,
      description: description,
      price: price,
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
    await models.furniture.destroy({
        where: {
            id: id
        }
    });
    res.status(200).json({ status: 'success' })
};


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'furnitures',
    format: async (req, file) => ['jpg', 'png', 'jpeg'], // supports promises as well
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
  uploadCloud,
};
