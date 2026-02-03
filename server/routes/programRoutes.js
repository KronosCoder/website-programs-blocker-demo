const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

// POST /api/programs - Add program
router.post('/', programController.addProgram);

// DELETE /api/programs/:id - Remove program
router.delete('/:id', programController.deleteProgram);

module.exports = router;
