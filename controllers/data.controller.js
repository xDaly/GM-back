const { dataService } = require("../services");
const resHandler = require("../helpers/responseHandler.helper");

exports.getStructures = async (req, res) => {
  try {
    const structures = await dataService.getStructures()
    resHandler.setSuccess(200, "structures trouver avec success", structures);
    return resHandler.send(res);
  } catch (error) {
    console.log(error);
    resHandler.setError(
      400,
      "Erreur au creation de touver les structures"
    );
    return resHandler.send(res);
  }
};


exports.getLocalisations = async (req, res) => {
  try {
    const localisations = await dataService.getLocalisations()
    resHandler.setSuccess(200, "localisations trouver avec success", localisations);
    return resHandler.send(res);
  } catch (error) {
    console.log(error);
    resHandler.setError(
      400,
      "Erreur au creation de touver les localisations"
    );
    return resHandler.send(res);
  }
};

exports.getTypes = async (req, res) => {
  try {
    const types = await dataService.getTypes()
    resHandler.setSuccess(200, "types trouver avec success", types);
    return resHandler.send(res);
  } catch (error) {
    console.log(error);
    resHandler.setError(
      400,
      "Erreur au creation de touver les types"
    );
    return resHandler.send(res);
  }
};


exports.getCounts = async (req, res) => {
  try {
    const counts = await dataService.getCounts()
    resHandler.setSuccess(200, "nombres trouver avec success", counts);
    return resHandler.send(res);
  } catch (error) {
    console.log(error);
    resHandler.setError(
      400,
      "Erreur au creation de touver les nombres"
    );
    return resHandler.send(res);
  }
};