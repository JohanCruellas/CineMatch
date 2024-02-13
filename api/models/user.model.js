const bcryptUtils = require('../utils/bcrypt.utils')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: 'username',
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'email',
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdministrator: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
    {
      timestamps: true,
      freezeTableName: true,
      hooks : {
        afterCreate : async (user, options) => {
          const List = sequelize.models.List
          await List.create({
            creator: user.id,
            title: "Votre liste",
            mainList: true,
          })
        },
        beforeCreate : async (user, options) => {
          user.password = await bcryptUtils.encryptPassword(user.password)
        }
      }
    },
  )
}