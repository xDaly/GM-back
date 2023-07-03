const { userService, authService } = require("../services");
const resHandler = require("../helpers/responseHandler.helper");

exports.checkToken = async (req, res, next) => {
  try {
    const decoded = await authService.checkToken(req.headers["authorization"]);
      const profil = await authService.getProfil(decoded.id);
      req.profil = profil;
      return next();
  } catch (error) {
    resHandler.setError(
      401,
      error.message
    );
    return resHandler.send(res);
  }
};
