function applyRelations(sequelize) {
    const { User, List, Role } = sequelize.models

    //#region User
    User.hasMany(List, {
        foreignKey: 'creator',
        as: 'lists',
        onDelete: 'CASCADE'
    })

    User.belongsToMany(Role, {
        through: 'user_role',
        as: 'roles'
    })
    //#endregion

    //#region List
    List.belongsTo(User, {
        foreignKey: 'creator',
    })
    //#endregion

    //#region Role
    Role.belongsToMany(User, {
        through: 'user_role',
        as: 'users'
    })
    //#endregion

}

module.exports = { applyRelations }