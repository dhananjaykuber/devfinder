const express = require('express');

const {
  getAllProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
} = require('../controller/profileController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllProfiles);
router.get('/:id', getProfile);
router.patch('/:id', authMiddleware, updateProfile);
router.delete('/:id', authMiddleware, deleteProfile);
// router.get('/userprofile', authMiddleware, )

module.exports = router;
