function applyRelation(sequelize) {

    const {furniture, room, auth, admin } = sequelize.models;

    room.hasMany(furniture);
    furniture.belongsTo(room);
    auth.belongsTo(admin, { foreignKey: 'admin_id' });
    // type.hasMany(furniture);
    // furniture.belongsTo(type);
    
}

module.exports = { applyRelation };