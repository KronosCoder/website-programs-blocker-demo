const archiver = require('archiver');
const { readData, writeData } = require('../models/dataModel');
const { generateBlockBat, generateUnblockBat } = require('../utils/batGenerator');

// Export BAT files and download as zip directly (fully in-memory, no disk writes)
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

        // Update version (wrapped in try-catch for read-only filesystems like Vercel)
        try {
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
        } catch (versionErr) {
            console.warn('[WARN] Could not persist version update (read-only FS?):', versionErr.message);
        }

        // Set response headers for zip download
        const zipFileName = `game_blocker_${version}.zip`;
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${zipFileName}"`);

        // Create archive and stream to response
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.on('error', (err) => {
            console.error('[ERROR] Archive error:', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Failed to create zip file' });
            }
        });

        archive.pipe(res);

        // Add BAT content directly to archive (in-memory, no disk I/O)
        archive.append(Buffer.from(blockBat, 'utf8'), { name: blockFileName });
        archive.append(Buffer.from(unblockBat, 'utf8'), { name: unblockFileName });

        archive.finalize();
    } catch (error) {
        console.error('[ERROR] Export failed:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to export BAT files' });
        }
    }
};
