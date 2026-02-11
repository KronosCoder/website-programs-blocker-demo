const { getRedirectUrl, setRedirectUrl } = require('../models/dataModel');

// Get redirect URL
exports.getRedirectUrl = async (req, res) => {
    try {
        const url = await getRedirectUrl();
        res.json({ redirectUrl: url });
    } catch (error) {
        console.error('[ERROR] getRedirectUrl:', error.message);
        res.status(500).json({ error: 'Failed to get redirect URL' });
    }
};

// Set redirect URL
exports.setRedirectUrl = async (req, res) => {
    try {
        const { url } = req.body;
        if (url === undefined || url === null) {
            return res.status(400).json({ error: 'URL is required' });
        }
        await setRedirectUrl(url);
        res.json({ success: true, redirectUrl: url });
    } catch (error) {
        console.error('[ERROR] setRedirectUrl:', error.message);
        res.status(500).json({ error: 'Failed to set redirect URL' });
    }
};
