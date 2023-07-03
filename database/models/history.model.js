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
    gestionnaire: {
      type: DataTypes.STRING
    },
    from: {
      type: DataTypes.STRING
    },
    to: {
      type: DataTypes.STRING
    }
  }
);  

