function applyRelations(sequelize) {
    const { User, List } = sequelize.models

    //#region User
    User.hasMany(List, {
        foreignKey: 'creator',
        as: 'lists'
    })
    //#endregion

    //#region List
    List.belongsTo(User, {
        foreignKey: 'creator',
    })
    //#endregion

}

module.exports = { applyRelations }