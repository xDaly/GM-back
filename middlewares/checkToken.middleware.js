const { userService, authService } = require("../services");

exports.checkToken = async (req, res, next) => {
  const decoded = await authService.checkToken(req.headers["authorization"]);
  const profil = await authService.getProfil(decoded.id);
  req.profil = profil;
  next();
};
