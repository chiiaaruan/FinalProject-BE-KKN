const { models } = require("../config/dbConfig");
const { getIdParam } = require('./helpers');

async function getAll(req, res) {
  const types = await models.type.findAll()
    res.status(200).json(types);
}

async function getById(req, res) {
  const id = getIdParam(req);
  const types = await models.type.findOne({
    where: {
      id: id,
    },
  });
  if (types) {
    res.status(200).json(types);
  } else {
    res.status(404).send("404 - Not found");
  }
}

async function create(req, res) {
  const { typeName, roomId } = req.body;
  if (req.body.id) {
    res
      .status(400)
      .json({
        error:
          "id should not be provided, since it is determined automatically by the database",
      });
  } else {
    await models.type.create({
      type_name: typeName,
      roomId: roomId,
    });
    res.status(201).json({
      success: true,
    });
  }
}

async function update(req, res) {
  const { typeName } = req.body;
  const id = getIdParam(req);
  await models.type.update(
    {
      type_name: typeName,
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
    await models.type.destroy({
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
