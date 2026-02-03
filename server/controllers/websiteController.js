const path = require('path');
const { readData, writeData, getNextId } = require('../models/dataModel');

// Add website
exports.addWebsite = (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const data = readData();
        const newWebsite = {
            id: getNextId(data.websites),
            url: url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')
        };
        data.websites.push(newWebsite);
        writeData(data);

        res.json(newWebsite);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add website' });
    }
};

// Delete website
exports.deleteWebsite = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = readData();
        data.websites = data.websites.filter(w => w.id !== id);
        writeData(data);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete website' });
    }
};
