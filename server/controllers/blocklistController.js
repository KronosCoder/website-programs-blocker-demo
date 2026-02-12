const { getBlocklist } = require('../models/dataModel');

// Get all blocklist data for a specific room
exports.getBlocklist = async (req, res) => {
    try {
        const roomId = req.query.roomId;
        if (!roomId) {
            return res.status(400).json({ error: 'roomId is required' });
        }
        const data = await getBlocklist(roomId);
        res.json(data);
    } catch (error) {
        console.error('[ERROR] getBlocklist:', error.message);
        res.status(500).json({ error: 'Failed to read data' });
    }
};
