const { User } = require("../database");
const { Profil } = require("../database");

exports.createUser = async ({ userName, password, role }) => {
  try {
    return await User.create({
      userName: userName,
      password: password,
      role: role,
    });
  } catch (error) {
    console.err(error);
    throw error;
  }
};

exports.creteProfil = async ({ UserId, nom, prenom, email }) => {
  try {
    const profil = await Profil.create({
      UserId,
      nom,
      prenom,
      email,
    });
    return profil;
  } catch (error) {
    console.err(error);
    throw error;
  }
};

exports.getGestinnaires = async () => {
  try {
    const user = await User.findAll({
      include: [Profil],
      where: {
        role: "gestionnaire",
      },
    });
    return user;
  } catch (error) {
    console.err(error);
    throw error;
  }
};

exports.deleteGestionnaire = async (id) => {
  try {
    const profil = await Profil.findOne({
      where: {
        id: id,
      },
    });

    await User.destroy({
      where: {
        id: profil.dataValues.UserId,
      },
    });
    // await Profil.destroy({
    //     where: {
    //         id: id
    //     }
    // })
  } catch (error) {
    console.err(error);
    throw error;
  }
};

exports.updateGestionnaire = async (newData, id) => {
  try {
    const profil = await Profil.findOne({
      where: {
        id: id,
      },
    });
    await User.update(
      {
        userName: newData.userName,
        password: newData.password,
      },
      {
        where: {
          id: profil.dataValues.UserId,
        },
      }
    );
    await Profil.update(
      {
        nom: newData.nom,
        prenom: newData.prenom,
        email: newData.email,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return await User.findAll({
      include: [Profil],
      where: {
        role: "gestionnaire",
      },
    });
  } catch (error) {
    console.err(error);
    throw error;
  }
};
