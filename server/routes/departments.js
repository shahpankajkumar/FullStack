const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const authMiddleware = require('../middleware/authMiddleware');
const cors = require('cors');
router.use(cors());

// Create Department
router.post('/add', authMiddleware.isManager, async (req, res) => {
    const { name } = req.body;
    try {
        const department = new Department({ name });
        await department.save();
        res.status(201).json(department);
    } catch (err) {s
        res.status(400).send(err.message);
    }
});

// Read Departments
router.get('/get', async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update Department
router.put('/udpate/:id', authMiddleware.isManager, async (req, res) => {
    const { name } = req.body;
    try {
        const department = await Department.findByIdAndUpdate(req.params.id, { name }, { new: true });
        res.json(department);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete Department
router.delete('/delete/:id', authMiddleware.isManager, async (req, res) => {
    try {
        await Department.findByIdAndDelete(req.params.id);
        res.send('Department deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
