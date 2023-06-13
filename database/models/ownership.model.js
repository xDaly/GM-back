const { sequelize } = require("../sequelize");
const { DataTypes, Sequelize } = require("sequelize");

exports.Ownership = sequelize.define(
  "Ownership",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    asset_id: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.STRING,
    }
  }
);  