function applyRelation(sequelize) {

    const { type, furniture, room, auth, admin } = sequelize.models;

    room.hasMany(type);
    type.belongsTo(room);
    
    type.hasMany(furniture);
    furniture.belongsTo(type);

    auth.belongsTo(admin, { foreignKey: 'merchant_id' });
}

module.exports = { applyRelation };