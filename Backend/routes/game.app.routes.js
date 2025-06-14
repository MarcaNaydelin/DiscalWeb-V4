const express = require('express');
const router = express.Router();
const GameAppController = require('../controllers/game.app.controller');
router.get('/child/:child_id/map', GameAppController.getGameMapForChild);
router.get('/child/:child_id/level/:level_id', GameAppController.getLevelData);
router.post('/child/:child_id/level/:level_id/attempt', GameAppController.postLevelResults);

module.exports = router;