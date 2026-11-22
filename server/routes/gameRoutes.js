const express = require('express');
const router = express.Router();
const { getGames, createGame, updateGame, deleteGame } = require('../controllers/gameController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getGames)
  .post(protect, admin, createGame);

router.route('/:id')
  .put(protect, admin, updateGame)
  .delete(protect, admin, deleteGame);

module.exports = router;