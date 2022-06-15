const { models } = require("../config/dbConfig");
const { getIdParam } = require('./helpers');
const bcrypt = require("bcrypt");

async function getAll(req, res) {
    const admins = await models.admin.findAll({
        attributes: ['id', 'username']
    });
    res.status(200).json(admins);
};

async function getById(req, res) {
    const id = getIdParam(req);
    const admins = await models.admin.findOne({
      where: {
        id: id,
      },
    });
    if (admins) {
      res.status(200).json(admins);
    } else {
      res.status(404).send("404 - Not found");
    }
  }

async function create(req, res) {
    const { username,  password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    if (req.body.id) {
        res.status(400).json({ error: "id should not be provided, since it is determined automatically by the database" })
    } else {
        await models.admin.create({
            password: hashedPassword,
            username: username,
        });
        res.status(201).json({
            success: true
        });
    }
};


async function remove(req, res) {
    const id = getIdParam(req);
    await models.admin.destroy({
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
    remove,
};