const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  deleteUser,
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/all', protect, adminOnly, getUsers);
router.get('/profile', protect, getUserById);
router.put('/profile/update', protect, updateProfile);
router.delete('/delete/:id', protect, adminOnly, deleteUser);

module.exports = router;