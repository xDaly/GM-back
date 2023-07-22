const { assetService } = require("../services");
const resHandler = require("../helpers/responseHandler.helper");

exports.createAsset = async (req, res) => {
  try {
    const newAsset = await assetService.AddAsset(req.body);
    resHandler.setSuccess(200, "Materiel a été ajouter avec succes", newAsset);
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

exports.getAssets = async (req, res) => {
  try {
    const assets = await assetService.getAssets(req.query, req.body);
    resHandler.setSuccess(200, "materiels", assets);
    return resHandler.send(res);
  } catch (error) {
    resHandler.setError(400, "Erreur au reception du data du materiels");
    return resHandler.send(res);
  }
};

exports.editAsset = async (req, res) => {
  try {
    const newAssetData = await assetService.updateAsset(
      req.body,
      req.params.id,
      req.profil
    );
    resHandler.setSuccess(
      200,
      "Materiel a été modifier avec succes",
      newAssetData
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

exports.deleteAsset = async (req, res) => {
  try {
    await assetService.deleteAsset(req.params.id,req.profil);
    resHandler.setSuccess(200, "Materiel a été supprimer avec succes", {});
    return resHandler.send(res);
  } catch (error) {
    console.log(error);
    resHandler.setError(400, "Erreur au creation de suppression de materiel");
    return resHandler.send(res);
  }
};


exports.getHistory = async (req,res) => {
  try {
    const history = await assetService.getHistory(req.params.id);
    resHandler.setSuccess(200, "Historique recupérer avec succes", history);
    return resHandler.send(res);
  } catch (error) {
    console.log(error);
    resHandler.setError(400, "Erreur au creation de suppression de materiel");
    return resHandler.send(res);
  }
}