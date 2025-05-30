const db = require('../config/db');

const createParent = async (name, email, password) => {
  const result = await db.query(
    'INSERT INTO parents (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, password]
  );
  return result.rows[0];
};

const findByEmail = async (email) => {
  const result = await db.query(
    'SELECT * FROM parents WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

module.exports = {
  createParent,
  findByEmail,
};
