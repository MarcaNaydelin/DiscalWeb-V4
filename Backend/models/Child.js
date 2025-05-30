const db = require('../config/db');

const createChild = async ({ parent_id, name, identification_type, age_group, avatar }) => {
  const result = await db.query(
    `INSERT INTO children 
    (parent_id, name, identification_type, age_group, avatar)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [parent_id, name, identification_type, age_group, avatar]
  );
  return result.rows[0];
};

const getChildrenByParent = async (parent_id) => {
  const result = await db.query(
    `SELECT * FROM children WHERE parent_id = $1 ORDER BY created_at ASC`,
    [parent_id]
  );
  return result.rows;
};

const updateChild = async ({ id, name, identification_type, age_group, avatar }) => {
  const result = await db.query(
    `UPDATE children
     SET name = $1,
         identification_type = $2,
         age_group = $3,
         avatar = $4
     WHERE id = $5
     RETURNING *`,
    [name, identification_type, age_group, avatar, id]
  );
  return result.rows[0];
};

module.exports = {
  createChild,
  getChildrenByParent,
  updateChild
};