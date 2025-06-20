const jwt = require("jsonwebtoken");

module.exports = (req, _res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return _res.status(401).json({ message: "Token requerido" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    return _res.status(401).json({ message: "Token inválido o expirado" });
  }
};