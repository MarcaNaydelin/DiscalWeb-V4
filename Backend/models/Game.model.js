const db = require('../config/db');

const Game = {
  create: async ({ skill_id, game_name, game_description, game_icon, order_in_skill }) => {
    const result = await db.query(
      `INSERT INTO games (skill_id, game_name, game_description, game_icon, order_in_skill)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [skill_id, game_name, game_description, game_icon, order_in_skill]
    );
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await db.query('SELECT * FROM games WHERE game_id = $1', [id]);
    return result.rows[0];
  },

  findByName: async (gameName) => {
     const result = await db.query('SELECT * FROM games WHERE game_name = $1', [gameName]);
     return result.rows[0];
  },

  findBySkillId: async (skillId) => {
    const result = await db.query(
      'SELECT * FROM games WHERE skill_id = $1 ORDER BY order_in_skill ASC',
      [skillId]
    );
    return result.rows;
  },
};

module.exports = Game;