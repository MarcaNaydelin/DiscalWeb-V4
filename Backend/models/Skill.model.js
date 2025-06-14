const db = require('../config/db');

const Skill = {
  create: async ({ skill_name, skill_description, skill_icon, unlock_order, prerequisite_skill_id }) => {
    const result = await db.query(
      `INSERT INTO skills (skill_name, skill_description, skill_icon, unlock_order, prerequisite_skill_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [skill_name, skill_description, skill_icon, unlock_order, prerequisite_skill_id]
    );
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await db.query('SELECT * FROM skills WHERE skill_id = $1', [id]);
    return result.rows[0];
  },

  findByName: async (skillName) => {
     const result = await db.query('SELECT * FROM skills WHERE skill_name = $1', [skillName]);
     return result.rows[0];
  },

  getAll: async () => {
    const result = await db.query('SELECT * FROM skills ORDER BY unlock_order ASC');
    return result.rows;
  },
};

module.exports = Skill;