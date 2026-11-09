const express = require('express');
const router = express.Router();
const controller = require('../controllers/pelangganController');

router.get('/', controller.index);
router.get('/:id', controller.detail);

module.exports = router;