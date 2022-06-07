function applyRelation(sequelize) {

    const { type, furniture, room } = sequelize.models;

    room.hasMany(type);
    type.belongsTo(room);
    type.hasMany(furniture);
    furniture.belongsTo(type);
}

module.exports = { applyRelation };