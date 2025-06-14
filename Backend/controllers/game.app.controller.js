const GameAppService = require('../services/game.app.service');

const GameAppController = {
  getLevelData: async (req, res) => {
    try {
      const { child_id, level_id } = req.params;
      // TODO: Autenticación/Autorización del niño
      const levelConfig = await GameAppService.getLevelConfiguration(parseInt(child_id), parseInt(level_id));
      res.status(200).json(levelConfig);
    } catch (error) {
      console.error("Error en GameAppController.getLevelData:", error.message, error.stack);
      res.status(error.status || 500).json({ message: error.message || "Error al obtener datos del nivel." });
    }
  },

  postLevelResults: async (req, res) => {
    try {
      const { child_id, level_id } = req.params;
      const attemptData = req.body;
      // TODO: Autenticación/Autorización y validación de attemptData
      const result = await GameAppService.submitLevelAttempt(parseInt(child_id), parseInt(level_id), attemptData);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error en GameAppController.postLevelResults:", error.message, error.stack);
      res.status(error.status || 500).json({ message: error.message || "Error al registrar resultado." });
    }
  },

  getGameMapForChild: async (req, res) => {
    try {
      const { child_id } = req.params;
      // TODO: Autenticación/Autorización
      const gameMap = await GameAppService.getChildGameMap(parseInt(child_id));
      res.status(200).json(gameMap);
    } catch (error) {
      console.error("Error en GameAppController.getGameMapForChild:", error.message, error.stack);
      res.status(error.status || 500).json({ message: error.message || "Error al obtener mapa de juegos." });
    }
  }
};

module.exports = GameAppController;