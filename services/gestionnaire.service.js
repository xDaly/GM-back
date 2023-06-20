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
    return error;
  }
};

exports.creteProfil = async ({ UserId, nom, prenom, email }) => {
  try {
    return await Profil.create({
      UserId,
      nom,
      prenom,
      email,
    });
  } catch (error) {
    return error;
  }
};

exports.getGestinnaires = async () => {
  try {
    return User.findAll({
      include: [Profil],
      where: {
        role: "gestionnaire",
      },
    });
  } catch (error) {
    return error;
  }
};

exports.deleteGestionnaire = async (id) => {
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
  } catch (error) {
    console.log(error);
  }
};
