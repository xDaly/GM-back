const { User } = require("../database");
const { Profil } = require("../database");
const jwt = require("jsonwebtoken");

const JWTSECRET = "secret";

exports.checkUser = async (userName, password) => {
  try {
    const user = await User.findOne({
      where: {
        userName: userName,
      },
    });
    if (!user) {
      throw "utilisateur introuvable";
    }
    console.log(user.dataValues.password == password);
    if (user.dataValues.password == password) {
      delete user.dataValues.createdAt;
      delete user.dataValues.updatedAt;
      return user.dataValues;
    } else {
      throw "password incorrect";
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getProfil = async (id) => {
  try {
    const profil = await Profil.findOne({
      attributes: [["id", "profil_id"], "nom", "prenom", "email"],
      where: {
        UserId: id,
      },
    });
    return profil.get();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.checkToken = async (token) => {
  try {
    var decoded = jwt.verify(token, JWTSECRET);
    return decoded;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.CreateToken = async (id) => {
  token = jwt.sign({ id: id }, JWTSECRET, { expiresIn: "100h" });
  return token;
};

exports.checkRole = async (id) => {
  const user = await User.findByPk(id);
  return user.dataValues.role;
};
