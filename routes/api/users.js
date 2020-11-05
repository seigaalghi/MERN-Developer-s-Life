const express = require('express');
const router = express.Router();

// @ROUTE   GET API/USERS
// @DESC    TEST ROUTE
// @ACCESS  PUBLIC

router.get('/', (req, res) => res.send('User Route'));

module.exports = router;
