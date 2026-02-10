const { getBlocklist } = require('../models/dataModel');

// Get all blocklist data
exports.getBlocklist = async (req, res) => {
    try {
        const data = await getBlocklist();
        res.json(data);
    } catch (error) {
        console.error('[ERROR] getBlocklist:', error.message);
        res.status(500).json({ error: 'Failed to read data' });
    }
};
