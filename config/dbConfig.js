const { Sequelize } = require("sequelize");
const { applyRelation } = require('../models/relation');

// const sequelize = new Sequelize(
//   "decoration", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });

const sequelize = new Sequelize(
  "backends_decoration", "backends_delvin", "Decoration2022", {
  host: "db1.srv.irza.net",
  dialect: "mysql",
});


const modelDefiners = [
    require('../models/authModel'),
    require('../models/furnitureModel'),
    require('../models/roomModel'),
    require('../models/adminModel'),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyRelation(sequelize);

module.exports = sequelize;