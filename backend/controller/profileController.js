const mongoose = require('mongoose');

const User = require('../models/userModel');

// Get all developers profiles
const getAllProfiles = async (req, res) => {
  const { skill } = req.query;

  try {
    // Get profiles by skills
    if (skill) {
      const profiles = await User.find({ skills: skill }).sort({
        createdAt: 1,
      });

      return res.status(200).json(profiles);
    }

    // Get all profiles
    const profiles = await User.find({}, '-password').sort({
      createdAt: 1,
    });

    return res.status(200).json(profiles);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

// Get single developer profile
const getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Could not found user' });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ error: 'Could not found user' });
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

// Update developer profile
const updateProfile = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Could not found user' });
    }

    const user = await User.updateOne(
      { _id: id, email: req.user.email },
      { ...req.body }
    );

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: 'Could not update profile' });
  }
};

// Delete developer profile
const deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Could not found user' });
    }

    const user = await User.deleteOne({ _id: id, email: req.user.email });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: 'Could not delete profile' });
  }
};

module.exports = {
  getAllProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
};
