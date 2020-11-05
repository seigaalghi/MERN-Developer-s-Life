const express = require('express');
const router = express.Router();

// @ROUTE   GET API/AUTHORS
// @DESC    TEST ROUTE
// @ACCESS  PUBLIC

router.get('/', (req, res) => res.send('Auth Route'));

module.exports = router;
