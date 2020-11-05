const express = require('express');
const router = express.Router();

// @ROUTE   GET API/POSTS
// @DESC    TEST ROUTE
// @ACCESS  PUBLIC

router.get('/', (req, res) => res.send('Posts Route'));

module.exports = router;
