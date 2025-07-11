require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* ------------------------------------------------------------------
   Password strength regex:
   • at least 8 characters
   • at least one digit (0‑9)
------------------------------------------------------------------- */
const passwordRegex = /^(?=.*[0-9]).{8,}$/;      // NEW

/* =========================  SIGN‑UP  ========================= */
router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    /* ---- validation ---- */
    if (!fullName?.trim()) {
      return res.status(400).json({ message: 'Full name is required' }); // NEW
    }
    if (!passwordRegex.test(password)) {                                 // NEW
      return res.status(400).json({
        message: 'Password must be at least 8 characters and contain a number'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    return res.status(201).json({
      token,
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email } // FIXED
    });
  } catch (err) {
    console.error('Signup Error:', err);
    return res.status(500).json({ error: err.message });
  }
});

/* =========================  LOGIN  ========================= */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    return res.json({
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email }
    });
  } catch (err) {
    console.error('Login Error:', err);           // FIXED label
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
