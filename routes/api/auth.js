const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @ROUTE   GET API/AUTHORS
// @DESC    TEST ROUTE
// @ACCESS  PUBLIC

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).send('Server Error');
  }
});

// @ROUTE   GET API/USERS
// @DESC    TEST ROUTE
// @ACCESS  PUBLIC

router.post('/', [check('email', 'Please insert a valid Email').isEmail(), check('password', 'Password is required').exists()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // Lihat apakah username sudah ada
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Email or Password' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Email or Password' }] });
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
