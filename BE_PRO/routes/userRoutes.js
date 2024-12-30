const express = require('express');
const { 
  getUserProfile, 
  updateUserProfile, 
  getAllUsers, 
  addUser, 
  deleteUser, 
  updateUser 
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware'); 

const router = express.Router();

router.route('/')
  .get(protect, getUserProfile)

router.route('/users')
  .get(protect, getAllUsers) 
  .post(protect, addUser);

router.route('/users/:id')
  .put(protect,  updateUser)  
  .delete(protect, deleteUser);

module.exports = router;
