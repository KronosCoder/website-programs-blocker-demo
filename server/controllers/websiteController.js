const { addWebsite: addWebsiteDb, deleteWebsite: deleteWebsiteDb } = require('../models/dataModel');

// Add website
exports.addWebsite = async (req, res) => {
    try {
        const { url, roomId } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }
        if (!roomId) {
            return res.status(400).json({ error: 'roomId is required' });
        }

        const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
        const newWebsite = await addWebsiteDb(cleanUrl, roomId);

        res.json(newWebsite);
    } catch (error) {
        console.error('[ERROR] addWebsite:', error.message);
        res.status(500).json({ error: 'Failed to add website' });
    }
};

// Delete website
exports.deleteWebsite = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await deleteWebsiteDb(id);
        res.json({ success: true });
    } catch (error) {
        console.error('[ERROR] deleteWebsite:', error.message);
        res.status(500).json({ error: 'Failed to delete website' });
    }
};
