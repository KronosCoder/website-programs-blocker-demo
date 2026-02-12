const archiver = require('archiver');
const { getBlocklist, getVersion, incrementVersion } = require('../models/dataModel');
const { generateBlockBat, generateUnblockBat } = require('../utils/batGenerator');

// Export BAT files and download as zip directly (fully in-memory, no disk writes)
exports.exportAndDownload = async (req, res) => {
    try {
        const roomId = req.query.roomId;
        if (!roomId) {
            return res.status(400).json({ error: 'roomId is required' });
        }
        const data = await getBlocklist(roomId);
        const versionObj = data.version;
        const version = `v${versionObj.major}.${versionObj.minor}.${versionObj.patch}`;

        // Generate BAT files content
        const blockBat = generateBlockBat(data, version);
        const unblockBat = generateUnblockBat(data, version);

        // File names
        const blockFileName = `block_${roomId}_${version}.bat`;
        const unblockFileName = `unblock_${roomId}_${version}.bat`;

        // Update version in database
        try {
            await incrementVersion();
        } catch (versionErr) {
            console.warn('[WARN] Could not persist version update:', versionErr.message);
        }

        // Set response headers for zip download
        const zipFileName = `e-blocker_${roomId}_${version}.zip`;
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
