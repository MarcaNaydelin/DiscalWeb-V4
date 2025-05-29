const db = require('../config/db');

const crearPadre = async (nombre, correo, password) => {
  const result = await db.query(
    'INSERT INTO padres (nombre, correo, password) VALUES ($1, $2, $3) RETURNING *',
    [nombre, correo, password]
  );
  return result.rows[0];
};

const buscarPorCorreo = async (correo) => {
  const result = await db.query(
    'SELECT * FROM padres WHERE correo = $1',
    [correo]
  );
  return result.rows[0];
};

module.exports = {
  crearPadre,
  buscarPorCorreo,
};
