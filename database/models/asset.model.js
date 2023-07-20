const { sequelize } = require("../sequelize");
const { DataTypes, Sequelize } = require("sequelize");

exports.Asset = sequelize.define("Asset", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  SN: {
    type: DataTypes.STRING,
  },
  model: {
    type: DataTypes.STRING,
  },
  buy_date: {
    type: DataTypes.STRING,
  },
  etat: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  observation: {
    type: DataTypes.TEXT({ length: "medium" }),
  },
});
