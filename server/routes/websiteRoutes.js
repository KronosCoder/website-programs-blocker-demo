const express = require('express');
const router = express.Router();
const websiteController = require('../controllers/websiteController');

// POST /api/websites - Add website
router.post('/', websiteController.addWebsite);

// DELETE /api/websites/:id - Remove website
router.delete('/:id', websiteController.deleteWebsite);

module.exports = router;
