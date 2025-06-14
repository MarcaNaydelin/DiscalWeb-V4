const SkillModel = require("../models/Skill.model");
const GameModel = require("../models/Game.model");
const GameLevelModel = require("../models/GameLevel.model");
const ProgressModel = require("../models/Progress.model");
const ChildModel = require("../models/Child.js");
const { v4: uuidv4 } = require("uuid");

const GameAppService = {
  _validateChildAndLevel: async (childId, levelId) => {
    const childExists = await ChildModel.findById(childId);
    if (!childExists) {
      console.error(`Validación: Niño con ID ${childId} no encontrado.`);
      throw { status: 404, message: "Niño no encontrado." };
    }
    if (levelId === undefined) return { childExists, levelDetails: null }; // Solo validar niño

    const levelDetails = await GameLevelModel.findById(levelId);
    if (!levelDetails) {
      console.error(`Validación: Nivel con ID ${levelId} no encontrado.`);
      throw { status: 404, message: "Nivel no encontrado." };
    }
    return { childExists, levelDetails };
  },

  ensureInitialStateForChild: async (childId) => {
    const child = await ChildModel.findById(childId);
    if (!child) {
      console.error(
        `ensureInitialStateForChild: Niño con ID ${childId} no encontrado.`
      );

      return { initialGameProgress: null, initialLevelProgress: null };
    }

    const skills = await SkillModel.getAll();
    if (!skills || skills.length === 0) {
      console.error(
        "ensureInitialStateForChild: No hay habilidades configuradas en la base de datos."
      );
      return { initialGameProgress: null, initialLevelProgress: null };
    }
    const firstSkill = skills[0]; // Asume que getAll() ordena por unlock_order

    const gamesInSkill = await GameModel.findBySkillId(firstSkill.skill_id);
    if (!gamesInSkill || gamesInSkill.length === 0) {
      console.error(
        `ensureInitialStateForChild: No hay juegos configurados para la habilidad inicial "${firstSkill.skill_name}".`
      );
      return { initialGameProgress: null, initialLevelProgress: null };
    }
    const firstGameInSkill = gamesInSkill[0];

    let gameProgress = await ProgressModel.getOrCreateGameProgress(
      childId,
      firstGameInSkill.game_id
    );
    if (!gameProgress.is_unlocked) {
      gameProgress = await ProgressModel.updateGameProgress(
        childId,
        firstGameInSkill.game_id,
        { is_unlocked: true }
      );
      console.log(
        `Juego "${firstGameInSkill.game_name}" (ID: ${firstGameInSkill.game_id}) desbloqueado para niño ${childId}`
      );
    }

    const levelsInGame = await GameLevelModel.findByGameId(
      firstGameInSkill.game_id
    );
    if (!levelsInGame || levelsInGame.length === 0) {
      console.error(
        `ensureInitialStateForChild: No hay niveles configurados para el juego inicial "${firstGameInSkill.game_name}".`
      );
      return { initialGameProgress: gameProgress, initialLevelProgress: null };
    }
    const firstLevelInGame = levelsInGame[0];

    let levelProgress = await ProgressModel.getOrCreateLevelProgress(
      childId,
      firstLevelInGame.level_id
    );
    if (!levelProgress.is_unlocked) {
      levelProgress = await ProgressModel.updateLevelProgress(
        childId,
        firstLevelInGame.level_id,
        {
          is_unlocked: true,
        }
      );
      console.log(
        `Primer nivel "${firstLevelInGame.level_name}" (ID: ${firstLevelInGame.level_id}) desbloqueado para niño ${childId}`
      );
    }
    return {
      initialGameProgress: gameProgress,
      initialLevelProgress: levelProgress,
    };
  },

  getLevelConfiguration: async (childId, levelId) => {
    const { levelDetails } = await GameAppService._validateChildAndLevel(
      childId,
      levelId
    ); // Valida ambos

    let levelProgress = await ProgressModel.getOrCreateLevelProgress(
      childId,
      levelId
    );

    if (!levelProgress.is_unlocked) {
      await GameAppService.ensureInitialStateForChild(childId);
      levelProgress = await ProgressModel.getOrCreateLevelProgress(
        childId,
        levelId
      ); // Re-fetch
      if (!levelProgress.is_unlocked) {
        throw {
          status: 403,
          message: `Nivel "${levelDetails.level_name}" no desbloqueado para este niño.`,
        };
      }
    }

    return {
      level_id: levelDetails.level_id,
      level_name: levelDetails.level_name,
      difficulty_tag: levelDetails.difficulty_tag,
      order_in_game: levelDetails.order_in_game,
      game_id: levelDetails.game_id,
      config: levelDetails.config_specific_level,
      current_progress: {
        stars_earned: levelProgress.stars_earned,
        is_completed: levelProgress.is_completed,
        attempts_count: levelProgress.attempts_count,
      },
    };
  },

  submitLevelAttempt: async (childId, levelId, attemptData) => {
    const {
      correct_answers,
      total_questions_in_level,
      question_details = [],
    } = attemptData;

    if (
      total_questions_in_level === undefined ||
      correct_answers === undefined
    ) {
      console.error(
        "submitLevelAttempt: Faltan 'correct_answers' o 'total_questions_in_level' en el cuerpo de la solicitud."
      );
      throw {
        status: 400,
        message:
          "Datos de intento incompletos: faltan 'correct_answers' o 'total_questions_in_level'.",
      };
    }
    if (
      typeof correct_answers !== "number" ||
      typeof total_questions_in_level !== "number" ||
      correct_answers < 0 ||
      total_questions_in_level < 0
    ) {
      console.error(
        "submitLevelAttempt: 'correct_answers' y 'total_questions_in_level' deben ser números no negativos."
      );
      throw {
        status: 400,
        message:
          "'correct_answers' y 'total_questions_in_level' deben ser números no negativos.",
      };
    }
    if (correct_answers > total_questions_in_level) {
      console.error(
        "submitLevelAttempt: 'correct_answers' no puede ser mayor que 'total_questions_in_level'."
      );
      throw {
        status: 400,
        message:
          "'correct_answers' no puede ser mayor que 'total_questions_in_level'.",
      };
    }

    const { levelDetails: levelInfo } =
      await GameAppService._validateChildAndLevel(childId, levelId);

    let currentLevelProgress = await ProgressModel.getOrCreateLevelProgress(
      childId,
      levelId
    );
    if (!currentLevelProgress.is_unlocked) {
      console.warn(
        `submitLevelAttempt: Intento en nivel ${levelId} que no estaba desbloqueado para niño ${childId}. Se intentará desbloquear el estado inicial.`
      );
      await GameAppService.ensureInitialStateForChild(childId);
      currentLevelProgress = await ProgressModel.getOrCreateLevelProgress(
        childId,
        levelId
      );
      if (!currentLevelProgress.is_unlocked) {
        throw {
          status: 403,
          message: `Nivel "${levelInfo.level_name}" no desbloqueado. No se puede registrar el intento.`,
        };
      }
    }

    let stars_earned_this_attempt = 0;
    const percentageCorrect =
      total_questions_in_level > 0
        ? (correct_answers / total_questions_in_level) * 100
        : 0;

    if (percentageCorrect >= 90) stars_earned_this_attempt = 3;
    else if (percentageCorrect >= 60)
      stars_earned_this_attempt = 2; // Ejemplo: 60% para 2 estrellas
    else if (percentageCorrect >= 30)
      stars_earned_this_attempt = 1; // Ejemplo: 30% para 1 estrella
    else if (
      total_questions_in_level > 0 &&
      correct_answers > 0 &&
      stars_earned_this_attempt === 0
    ) {
    }

    const updatedProgressData = {
      stars_earned: stars_earned_this_attempt,
      is_completed: stars_earned_this_attempt > 0,
      last_attempt_at: new Date(),
    };
    const finalLevelProgress = await ProgressModel.updateLevelProgress(
      childId,
      levelId,
      updatedProgressData
    );

    const session_attempt_guid = uuidv4();
    if (
      question_details &&
      Array.isArray(question_details) &&
      question_details.length > 0
    ) {
      for (const detail of question_details) {
        await ProgressModel.createLevelAttemptDetail({
          level_progress_id: finalLevelProgress.level_progress_id,
          child_id: childId,
          level_id: levelId,
          session_attempt_guid,
          question_identifier:
            detail.question_identifier || `q_${uuidv4().substring(0, 8)}`,
          question_data: detail.question_data,
          user_answer: detail.user_answer,
          is_correct: detail.is_correct,
          attempt_number_for_question: detail.attempt_number_for_question || 1,
          time_taken_ms: detail.time_taken_ms,
          feedback_given: detail.feedback_given,
        });
      }
    }

    let nextLevelUnlockedDetails = null;
    if (
      finalLevelProgress.is_completed &&
      finalLevelProgress.stars_earned >= levelInfo.stars_to_unlock_next
    ) {
      const nextLevel = await GameLevelModel.getNextLevelInGame(
        levelInfo.game_id,
        levelInfo.order_in_game
      );
      if (nextLevel) {
        let nextLevelProgress = await ProgressModel.getOrCreateLevelProgress(
          childId,
          nextLevel.level_id
        );
        if (!nextLevelProgress.is_unlocked) {
          nextLevelProgress = await ProgressModel.updateLevelProgress(
            childId,
            nextLevel.level_id,
            {
              is_unlocked: true,
            }
          );
          nextLevelUnlockedDetails = {
            level_id: nextLevel.level_id,
            level_name: nextLevel.level_name,
            message: `¡Nivel "${nextLevel.level_name}" desbloqueado!`,
          };
          console.log(
            `Siguiente nivel "${nextLevel.level_name}" (ID: ${nextLevel.level_id}) desbloqueado para niño ${childId}.`
          );
        }
      } else {
        console.log(
          `Niño ${childId} completó el último nivel (o no hay siguiente definido) del juego ${levelInfo.game_id}.`
        );
        // TODO: Marcar juego como completado y verificar desbloqueo de siguiente juego/habilidad.
      }
    }

    return {
      message: "Intento registrado.",
      level_progress: finalLevelProgress,
      stars_earned_this_attempt,
      next_level_unlocked: nextLevelUnlockedDetails,
      session_attempt_guid,
    };
  },

  getChildGameMap: async (childId) => {
    const childExists = await ChildModel.findById(childId);
    if (!childExists) {
      console.error(`getChildGameMap: Niño con ID ${childId} no encontrado.`);
      throw { status: 404, message: "Niño no encontrado." };
    }

    const initialState = await GameAppService.ensureInitialStateForChild(
      childId
    );
    if (!initialState || !initialState.initialLevelProgress) {
      console.warn(
        `getChildGameMap: No se pudo asegurar el estado inicial para el niño ${childId}. Puede que no haya contenido configurado.`
      );
    }

    const allSkills = await SkillModel.getAll();
    if (!allSkills || allSkills.length === 0) {
      return []; // No hay habilidades, mapa vacío.
    }
    const gameMap = [];

    for (const skill of allSkills) {
      const gamesInSkill = await GameModel.findBySkillId(skill.skill_id);
      // Solo incluimos la habilidad en el mapa si tiene juegos.
      if (!gamesInSkill || gamesInSkill.length === 0) continue;

      const skillData = {
        skill_id: skill.skill_id,
        skill_name: skill.skill_name,
        skill_icon: skill.skill_icon,
        unlock_order: skill.unlock_order,
        // TODO: Añadir progreso de la habilidad (is_unlocked, is_completed)
        games: [],
      };

      for (const game of gamesInSkill) {
        const levelsInGame = await GameLevelModel.findByGameId(game.game_id);
        // Solo incluimos el juego si tiene niveles.
        if (!levelsInGame || levelsInGame.length === 0) continue;

        const gameProgress = await ProgressModel.getOrCreateGameProgress(
          childId,
          game.game_id
        );
        const gameDetails = {
          game_id: game.game_id,
          game_name: game.game_name,
          game_icon: game.game_icon,
          order_in_skill: game.order_in_skill,
          is_unlocked: gameProgress.is_unlocked, // Este se actualizó en ensureInitialStateForChild si era el primer juego
          is_completed: gameProgress.is_completed,
          total_stars_earned_in_game: gameProgress.total_stars_earned_in_game,
          levels: [],
        };

        for (const level of levelsInGame) {
          const levelProgress = await ProgressModel.getOrCreateLevelProgress(
            childId,
            level.level_id
          );
          gameDetails.levels.push({
            level_id: level.level_id,
            level_name: level.level_name,
            difficulty_tag: level.difficulty_tag,
            order_in_game: level.order_in_game,
            config_specific_level: level.config_specific_level, // Enviar configuración al mapa
            is_unlocked: levelProgress.is_unlocked, // Este se actualizó en ensureInitialStateForChild si era el primer nivel
            is_completed: levelProgress.is_completed,
            stars_earned: levelProgress.stars_earned,
          });
        }
        // Si el primer nivel del juego está desbloqueado, el juego debe estar desbloqueado.
        // (Esto ya se maneja en ensureInitialStateForChild para el primer juego)
        if (
          gameDetails.levels.length > 0 &&
          gameDetails.levels[0].is_unlocked &&
          !gameDetails.is_unlocked
        ) {
          await ProgressModel.updateGameProgress(childId, game.game_id, {
            is_unlocked: true,
          });
          gameDetails.is_unlocked = true;
        }

        skillData.games.push(gameDetails);
      }
      if (
        skillData.games.length > 0 &&
        (skillData.games.some((g) => g.is_unlocked) || skill.unlock_order === 1)
      ) {
        gameMap.push(skillData);
      }
    }
    return gameMap;
  },
};

module.exports = GameAppService;
