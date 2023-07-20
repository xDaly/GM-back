const { Asset } = require("../database");
const { Employe } = require("../database");
const { User } = require("../database");
const { paginate } = require("../helpers/paginate.helper");
const { Op } = require("sequelize");

exports.AddEmploye = async (employe) => {
  try {
    const NewEmploye = await Employe.create({
      nom: employe.nom,
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
    console.error(error);
    throw error;
  }
};

exports.getEmployes = async (query, filters) => {
  try {
    const pagination = paginate(
      query.page,
      query.size,
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
            archived: { [Op.eq]: filters.archived }
          },
          {
            [Op.and]: [
              { nom: { [Op.substring]: filters.nom } },
              { cin: { [Op.substring]: filters.cin } },
              { structure: { [Op.substring]: filters.structure } },
              { etage: { [Op.substring]: filters.etage } },
              { region: { [Op.substring]: filters.region } },
              { localisation: { [Op.substring]: filters.localisation } },
            ],
          },
        ],
      },
    });
    return employes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getEmployesForAffectation = async () => {
  try {

    const employes = await Employe.findAll({
      attributes: ['id', 'nom'],
      where : {
        archived : false
      }
    })
    return employes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



exports.updateEmploye = async (newData, id) => {
  try {
    await Employe.update(
      {
        ...newData,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return await Employe.findByPk(id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getEmployeByIdWithAssets = async (id) => {
  try {
  return  await Employe.findByPk(id,{
      include:[Asset]
    })
  } catch (error) {
    console.error(error);
    throw error;
  }
};



