const { readData, writeData, getNextId } = require('../models/dataModel');

// Get all blocklist data
exports.getBlocklist = (req, res) => {
    try {
        const data = readData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read data' });
    }
};
