module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('List', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        creator: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        medias : {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
        mainList: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
        {
            timestamps: true,
            freezeTableName: true,
        },
    )
}