const db = require('../config/db');

const ProgressModel = {
  getOrCreateLevelProgress: async (childId, levelId) => {
    let result = await db.query(
      'SELECT * FROM child_level_progress WHERE child_id = $1 AND level_id = $2',
      [childId, levelId]
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    
    result = await db.query(
      `INSERT INTO child_level_progress (child_id, level_id, is_unlocked, first_unlocked_at)
       VALUES ($1, $2, FALSE, NULL)
       RETURNING *`,
      [childId, levelId]
    );
    return result.rows[0];
  },

  updateLevelProgress: async (childId, levelId, data) => {
    const currentProgress = await ProgressModel.getOrCreateLevelProgress(childId, levelId);

    const updates = [];
    const values = [];
    let valueCounter = 1;

    let newStars = data.stars_earned !== undefined ? data.stars_earned : currentProgress.stars_earned;
    let newBestScore = data.best_score !== undefined ? data.best_score : currentProgress.best_score;

    if (newStars > currentProgress.stars_earned || currentProgress.stars_earned === 0) {
        updates.push(`stars_earned = $${valueCounter++}`);
        values.push(newStars);
    } else {
        newStars = currentProgress.stars_earned;
    }

    if (data.best_score !== undefined && (data.best_score > currentProgress.best_score || currentProgress.best_score === null)) {
        updates.push(`best_score = $${valueCounter++}`);
        values.push(data.best_score);
    } else {
        newBestScore = currentProgress.best_score;
    }

    updates.push(`attempts_count = $${valueCounter++}`);
    values.push(currentProgress.attempts_count + 1);

    if (data.is_completed !== undefined && data.is_completed && !currentProgress.is_completed) {
        updates.push(`is_completed = $${valueCounter++}`);
        values.push(true);
    }
    if (data.is_unlocked !== undefined && data.is_unlocked && !currentProgress.is_unlocked) {
        updates.push(`is_unlocked = $${valueCounter++}`);
        values.push(true);
        updates.push(`first_unlocked_at = $${valueCounter++}`);
        values.push(new Date());
    }
    if (data.last_attempt_at !== undefined) {
        updates.push(`last_attempt_at = $${valueCounter++}`);
        values.push(data.last_attempt_at);
    }

    if (newStars === 3 && currentProgress.stars_earned < 3 && !currentProgress.completed_with_max_stars_at) {
        updates.push(`completed_with_max_stars_at = $${valueCounter++}`);
        values.push(new Date());
    }
    
    if (updates.length === 0 && values.length === 0) return currentProgress; 
    if (updates.length === 0) {
        updates.push(`attempts_count = $${valueCounter++}`);
        values.push(currentProgress.attempts_count + 1);
        if (data.last_attempt_at) {
            updates.push(`last_attempt_at = $${valueCounter++}`);
            values.push(data.last_attempt_at);
        } else {
             updates.push(`last_attempt_at = $${valueCounter++}`);
            values.push(new Date());
        }
    }

    values.push(childId, levelId);
    const query = `UPDATE child_level_progress SET ${updates.join(', ')}, updated_at = NOW()
    WHERE child_id = $${valueCounter++} AND level_id = $${valueCounter++}
    RETURNING *`;

    const result = await db.query(query, values);
    return result.rows[0];
  },

  getChildLevelProgressDetails: async (childId, levelId) => {
    const result = await db.query(
      `SELECT clp.*, gl.level_name, gl.difficulty_tag, gl.order_in_game, gl.stars_to_unlock_next, gl.config_specific_level
       FROM child_level_progress clp
       JOIN game_levels gl ON clp.level_id = gl.level_id
       WHERE clp.child_id = $1 AND clp.level_id = $2`,
      [childId, levelId]
    );
    return result.rows[0];
  },

  getChildLevelsProgressByGame: async (childId, gameId) => {
    const result = await db.query(
      `SELECT clp.*, gl.level_name, gl.order_in_game, gl.config_specific_level
       FROM child_level_progress clp
       JOIN game_levels gl ON clp.level_id = gl.level_id
       WHERE clp.child_id = $1 AND gl.game_id = $2
       ORDER BY gl.order_in_game ASC`,
      [childId, gameId]
    );
    return result.rows;
  },

  createLevelAttemptDetail: async (detailData) => {
    const {
      level_progress_id, child_id, level_id, session_attempt_guid,
      question_identifier, question_data, user_answer, is_correct,
      attempt_number_for_question, time_taken_ms, feedback_given,
    } = detailData;
    const result = await db.query(
      `INSERT INTO level_attempt_details
       (level_progress_id, child_id, level_id, session_attempt_guid, question_identifier, question_data, user_answer, is_correct, attempt_number_for_question, time_taken_ms, feedback_given)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        level_progress_id, child_id, level_id, session_attempt_guid,
        question_identifier, question_data, user_answer, is_correct,
        attempt_number_for_question, time_taken_ms, feedback_given,
      ]
    );
    return result.rows[0];
  },

  getOrCreateGameProgress: async (childId, gameId) => {
    let result = await db.query(
        'SELECT * FROM child_game_progress WHERE child_id = $1 AND game_id = $2',
        [childId, gameId]
    );
    if (result.rows.length > 0) return result.rows[0];

    result = await db.query(
        `INSERT INTO child_game_progress (child_id, game_id, is_unlocked)
         VALUES ($1, $2, FALSE) RETURNING *`,
        [childId, gameId]
    );
    return result.rows[0];
  },

  updateGameProgress: async (childId, gameId, data) => {
    const { is_unlocked, is_completed, total_stars_earned_in_game } = data;
    const updates = [];
    const values = [];
    let valueCounter = 1;

    if (is_unlocked !== undefined) {
        updates.push(`is_unlocked = $${valueCounter++}`);
        values.push(is_unlocked);
    }
    if (is_completed !== undefined) {
        updates.push(`is_completed = $${valueCounter++}`);
        values.push(is_completed);
    }
    if (total_stars_earned_in_game !== undefined) {
        updates.push(`total_stars_earned_in_game = $${valueCounter++}`);
        values.push(total_stars_earned_in_game);
    }
    
    if (updates.length === 0) {
        return ProgressModel.getOrCreateGameProgress(childId, gameId);
    }
    
    values.push(childId, gameId);
    const query = `UPDATE child_game_progress SET ${updates.join(', ')}, updated_at = NOW()
    WHERE child_id = $${valueCounter++} AND game_id = $${valueCounter++}
    RETURNING *`;
    const result = await db.query(query, values);
    return result.rows[0];
  },
};
module.exports = ProgressModel;