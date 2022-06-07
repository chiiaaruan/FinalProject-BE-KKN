const { models } = require("../config/dbConfig");
const { getIdParam } = require('../controllers/helpers');

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
  const { furnitureName,quantity, description, price, typeId } = req.body;
  if (req.body.id) {
    res
      .status(400)
      .json({
        error:
          "id should not be provided, since it is determined automatically by the database",
      });
  } else {
    await models.furniture.create({
      name: furnitureName,
      quantity: quantity,
      description: description,
      price: price,
      typeId: typeId,
    });
    res.status(201).json({
      success: true,
    });
  }
}

async function update(req, res) {
  const  { furnitureName,quantity, description, price } = req.body;
  const id = getIdParam(req);
  await models.furniture.update(
    {
      name: furnitureName,
      quantity: quantity,
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

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
