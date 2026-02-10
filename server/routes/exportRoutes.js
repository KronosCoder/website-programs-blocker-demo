const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');

// GET /api/export-download - Export BAT files and download as zip
router.get('/export-download', exportController.exportAndDownload);

module.exports = router;
