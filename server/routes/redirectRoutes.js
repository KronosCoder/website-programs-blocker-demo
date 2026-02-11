const express = require('express');
const router = express.Router();
const redirectController = require('../controllers/redirectController');

// GET /api/redirect-url - Get current redirect URL
router.get('/', redirectController.getRedirectUrl);

// PUT /api/redirect-url - Update redirect URL
router.put('/', redirectController.setRedirectUrl);

module.exports = router;
