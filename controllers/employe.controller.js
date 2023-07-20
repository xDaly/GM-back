const { employeService } = require("../services");
const resHandler = require("../helpers/responseHandler.helper");

exports.createEmploye = async (req, res) => {
  try {
    const newEmploye = await employeService.AddEmploye(req.body);
    resHandler.setSuccess(200, "Materiel a été ajouter avec succes", newEmploye);
    return resHandler.send(res);
  } catch (error) {
    console.log(error);
    resHandler.setError(
      400,
      "Erreur au creation de l'ajout de materiel merci de verifier les information"
    );
    return resHandler.send(res);
  }
};

exports.getEmployes = async (req, res) => {
  try {
    const employes = await employeService.getEmployes(req.query, req.body);
    resHandler.setSuccess(200, "employes", employes);
    return resHandler.send(res);
  } catch (error) {
    resHandler.setError(400, "Erreur au reception du data des employes");
    return resHandler.send(res);
  }
};

exports.getEmployesForAffectation = async (req, res) => {
  try {
    const employes = await employeService.getEmployesForAffectation()
    resHandler.setSuccess(200, "employes", employes);
    return resHandler.send(res);
  } catch (error) {
    resHandler.setError(400, "Erreur au reception du data des employes");
    return resHandler.send(res);
  }
};

exports.updateEmploye = async (req, res) => {
  try {
    const newEmployeData = await employeService.updateEmploye(
      req.body,
      req.params.id
    );
    resHandler.setSuccess(
      200,
      "Materiel a été modifier avec succes",
      newEmployeData
    );
    return resHandler.send(res);
  } catch (error) {
    console.log(error);
    resHandler.setError(
      400,
      "Erreur au creation de modification de materiel merci de verifier les information"
    );
    return resHandler.send(res);
  }
};

exports.getEmployeByIdWithAssets = async (req, res) => {
  try {
    const data = await employeService.getEmployeByIdWithAssets(req.params.id);
    resHandler.setSuccess(200, "Employe a été recupérer avec succes", data);
    return resHandler.send(res);
  } catch (error) {
    console.log(error);
    resHandler.setError(400, "Erreur au creation de recuperation  des informations");
    return resHandler.send(res);
  }
};
