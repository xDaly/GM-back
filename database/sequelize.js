const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
});


(async () => {
    try {
        await sequelize.authenticate();
        sequelize.sync({ alter: true });
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

module.exports = {
    sequelize: sequelize,
}; 