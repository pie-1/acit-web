const express = require('express');
const router = express.Router();
const { getMemes, createMeme, toggleUpvote, deleteMeme } = require('../controllers/memeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getMemes)
  .post(protect, createMeme); 
router.post('/:id/upvote', protect, toggleUpvote); 
router.delete('/:id', protect, admin, deleteMeme); 

module.exports = router;