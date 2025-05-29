const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const crearToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const encriptarPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const compararPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  crearToken,
  encriptarPassword,
  compararPassword
};
