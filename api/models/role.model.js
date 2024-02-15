module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('Role', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            timestamps: true,
            freezeTableName: true,
        },
    )
}