const Meme = require('../models/Meme');

const getMemes = async (req, res) => {
  try {
    const memes = await Meme.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.json(memes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMeme = async (req, res) => {
  try {
    const meme = await Meme.create({ ...req.body, author: req.user._id });
    res.status(201).json(meme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleUpvote = async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);
    if (!meme) return res.status(404).json({ message: 'Meme not found' });

    const userId = req.user._id.toString();
    const hasUpvoted = meme.upvotes.some((id) => id.toString() === userId);

    if (hasUpvoted) {
      meme.upvotes = meme.upvotes.filter((id) => id.toString() !== userId);
    } else {
      meme.upvotes.push(req.user._id);
    }

    await meme.save();
    res.json({ upvotes: meme.upvotes.length, hasUpvoted: !hasUpvoted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMeme = async (req, res) => {
  try {
    const meme = await Meme.findByIdAndDelete(req.params.id);
    if (!meme) return res.status(404).json({ message: 'Meme not found' });
    res.json({ message: 'Meme removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMemes, createMeme, toggleUpvote, deleteMeme };