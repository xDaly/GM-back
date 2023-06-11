const { sequelize } = require("../sequelize");
const { DataTypes,Sequelize } = require("sequelize");

exports.User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role : {
      type : DataTypes.STRING
    }
  }
);  