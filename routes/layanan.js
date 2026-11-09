const express = require('express');
const router = express.Router();
const controller = require('../controllers/layananController');

router.get('/', controller.index);

module.exports = router;