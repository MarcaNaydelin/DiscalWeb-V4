const db = require('../config/db');

const GameLevel = {
  create: async ({ game_id, level_name, difficulty_tag, order_in_game, stars_to_unlock_next, config_specific_level }) => {
    const result = await db.query(
      `INSERT INTO game_levels (game_id, level_name, difficulty_tag, order_in_game, stars_to_unlock_next, config_specific_level)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [game_id, level_name, difficulty_tag, order_in_game, stars_to_unlock_next, config_specific_level]
    );
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await db.query('SELECT * FROM game_levels WHERE level_id = $1', [id]);
    return result.rows[0];
  },

  findByGameId: async (gameId) => {
    const result = await db.query(
      'SELECT * FROM game_levels WHERE game_id = $1 ORDER BY order_in_game ASC',
      [gameId]
    );
    return result.rows;
  },

  getNextLevelInGame: async (gameId, currentOrderInGame) => {
     const result = await db.query(
         `SELECT * FROM game_levels 
          WHERE game_id = $1 AND order_in_game > $2
          ORDER BY order_in_game ASC
          LIMIT 1`,
         [gameId, currentOrderInGame]
     );
     return result.rows[0];
  },
  // Obtiene el primer nivel de un juego
   getFirstLevelOfGame: async (gameId) => {
     const result = await db.query(
         `SELECT * FROM game_levels 
          WHERE game_id = $1
          ORDER BY order_in_game ASC
          LIMIT 1`,
         [gameId]
     );
     return result.rows[0];
 },
};

module.exports = GameLevel;