const express = require('express');
const router = express.Router();

// @ROUTE   GET API/PROFILE
// @DESC    TEST ROUTE
// @ACCESS  PUBLIC

router.get('/', (req, res) => res.send('Profile Route'));

module.exports = router;
