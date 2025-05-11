// filepath: c:\Users\DELL\hotel-admin-api\routes\users.js
const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const { protect, authorize } = require('../middleware/auth');

// Apply protection to all routes
router.use(protect);
// Only admin can access these routes
router.use(authorize('admin'));

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;