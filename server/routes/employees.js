const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const cors = require('cors');
router.use(cors());


// Create user (Accessible by everyone)
router.post('/create', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // View all employees (Accessible by everyone)
  router.get('/employees', async (req, res) => {
    try {
      const employees = await User.find({ role: 'employee' });
      res.status(200).send(employees);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // View all users (Accessible by managers only)
  router.get('/', authMiddleware.isManager, async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // Update user (Accessible by managers only)
  router.put('/:id', authMiddleware.isManager, async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // Delete user (Accessible by managers only)
  router.delete('/:id', authMiddleware.isManager, async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).send('User deleted');
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // Add department to user (Accessible by managers only)
  router.put('/:id/add-department', authMiddleware.isManager, async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { department: req.body.department }, { new: true });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // Update department (Accessible by managers only)
  router.put('/:id/update-department', authMiddleware.isManager, async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { department: req.body.department }, { new: true });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // Delete department from user (Accessible by managers only)
  router.put('/:id/delete-department', authMiddleware.isManager, async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { $unset: { department: "" } }, { new: true });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  module.exports = router;

