const { Sequelize } = require("sequelize");
const { applyRelation } = require('../models/relation');

const sequelize = new Sequelize("decoration", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const modelDefiners = [
    // require('../models/authModel'),
    require('../models/typeModel'),
    require('../models/furnitureModel'),
    require('../models/roomModel'),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyRelation(sequelize);

module.exports = sequelize;