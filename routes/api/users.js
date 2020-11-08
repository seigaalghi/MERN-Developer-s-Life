const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @ROUTE   GET API/USERS
// @DESC    TEST ROUTE
// @ACCESS  PUBLIC

router.get('/', async (req, res) => {
  let user = await User.find().select('-password');
  return res.status(200).json(user);
});

router.post(
  '/',
  [
    check('name', 'Name is Requierd').not().isEmpty(),
    check('email', 'Please insert a valid Email').isEmail(),
    check(
      'password',
      'Please enter a password with atleast 6 characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    console.log(req.body);
    const { name, email, password } = req.body;

    try {
      // Lihat apakah username sudah ada
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email already registered' }] });
      }
      // Dapatkan Gravatar dari User
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });
      // Encrypt Password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
