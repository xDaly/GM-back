const { Asset } = require("../database");
const { Employe } = require("../database");
const { User } = require("../database");
const { paginate } = require("../helpers/paginate.helper");
const { Op } = require("sequelize");

exports.AddEmploye = async (employe) => {
  try {
    const NewEmploye = await Employe.create({
      nom: employe.nom,
      prenom: employe.prenom,
      cin: employe.cin,
      structure: employe.structure,
      etage: employe.etage,
      bureau: employe.bureau,
      poste: employe.poste,
      region: employe.region,
      localisation: employe.localisation,
      archived: false
    });
    return NewEmploye.get();
  } catch (error) {
    console.err(error);
    throw error;
  }
};

exports.getAssets = async (query, filters) => {
  try {
    const pagination = paginate(
      query.page,
      query.pageSize,
      query.orderBy,
      query.direction
    );
    const employes = await Employe.findAndCountAll({
      offset: +pagination.offset,
      limit: +pagination.limit,
      order: pagination.order,
      where: {
        [Op.and]: [
          {
            archived: filters.archived
              ? { [Op.eq]: filters.archived }
              : { [Op.not]: false },
          },
          {
            [Op.or]: [
              { nom: { [Op.substring]: filters.nom || "" } },
              { prenom: { [Op.substring]: filters.prenom || "" } },
              { cin: { [Op.substring]: filters.cin || "" } },
              { structure: { [Op.substring]: filters.structure || "" } },
              { etage: { [Op.substring]: filters.etage || "" } },
              { bureau: { [Op.substring]: filters.bureau || "" } },
              { poste: { [Op.substring]: filters.poste || "" } },
              { region: { [Op.substring]: filters.region || "" } },
              { localisation: { [Op.substring]: filters.localisation || "" } },
            ],
          },
        ],
      },
    });
    return employes;
  } catch (error) {
    console.err(error);
    throw error;
  }
};

exports.deleteGestionnaire = async (id) => {
  const profil = await Asset.findOne({
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

exports.updateAsset = async (newData, id) => {
  try {
    await Asset.update(
      {
        ...newData,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return await Asset.findByPk(id);
  } catch (error) {
    return error;
  }
};

exports.deleteAsset = async (id) => {
  try {
    await Asset.update(
      {
        etat: "declassé",
      },
      {
        where: {
          id: id,
        },
      }
    );
    return await Asset.findByPk(id);
  } catch (error) {
    return error;
  }
};



