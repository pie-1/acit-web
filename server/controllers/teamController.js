const TeamMember = require('../models/TeamMember');

const getTeamMembers = async (req, res) => {
  try {
    // Optional query param: /api/team?type=current or /api/team?type=legacy
    const filter = req.query.type ? { type: req.query.type } : {};
    const team = await TeamMember.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json({ message: 'Member removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember };