const express = require('express');
const router = express.Router();
const blocklistController = require('../controllers/blocklistController');

// GET /api/blocklist - Get all data
router.get('/', blocklistController.getBlocklist);

module.exports = router;
