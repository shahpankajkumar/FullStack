const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
router.use(cors());

// Register
router.post('/signup', async (req, res) => {
    const { name, email, phone, password, role } = req.body;
    console.log("name: ", name, "email: ", email, "phone :", phone, "password :", password, "role: ", role);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, phone, password: hashedPassword, role });
        await user.save();
        res.status(201).send('User created');
    } catch (err) {
        console.log("err: ", err);
        res.status(400).send(err.message);
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
