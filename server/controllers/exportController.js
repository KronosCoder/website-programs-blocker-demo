const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { readData, writeData } = require('../models/dataModel');
const { generateBlockBat, generateUnblockBat } = require('../utils/batGenerator');

const EXPORTS_DIR = path.join(__dirname, '..', 'exports');

// Export BAT files and download as zip directly
exports.exportAndDownload = (req, res) => {
    try {
        const data = readData();
        const version = `v${data.version.major}.${data.version.minor}.${data.version.patch}`;

        // Generate BAT files content
        const blockBat = generateBlockBat(data, version);
        const unblockBat = generateUnblockBat(data, version);

        // File names
        const blockFileName = `block_games_${version}.bat`;
        const unblockFileName = `unblock_games_${version}.bat`;

        // Save files to disk (optional, keeps a copy on server)
        fs.writeFileSync(path.join(EXPORTS_DIR, blockFileName), blockBat);
        fs.writeFileSync(path.join(EXPORTS_DIR, unblockFileName), unblockBat);

        // Update version
        data.version.patch++;
        if (data.version.patch >= 10) {
            data.version.patch = 0;
            data.version.minor++;
            if (data.version.minor >= 10) {
                data.version.minor = 0;
                data.version.major++;
            }
        }
        writeData(data);

        // Set response headers for zip download
        const zipFileName = `game_blocker_${version}.zip`;
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${zipFileName}"`);

        // Create archive and stream to response
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.on('error', (err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create zip file' });
        });

        archive.pipe(res);

        // Add BAT files to archive
        archive.file(path.join(EXPORTS_DIR, blockFileName), { name: blockFileName });
        archive.file(path.join(EXPORTS_DIR, unblockFileName), { name: unblockFileName });

        archive.finalize();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to export BAT files' });
    }
};
