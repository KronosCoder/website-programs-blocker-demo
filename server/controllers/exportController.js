const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { readData, writeData } = require('../models/dataModel');
const { generateBlockBat, generateUnblockBat } = require('../utils/batGenerator');

const EXPORTS_DIR = path.join(__dirname, '..', 'exports');

// Export BAT files
exports.exportBat = (req, res) => {
    try {
        const data = readData();
        const version = `v${data.version.major}.${data.version.minor}.${data.version.patch}`;

        // Generate BAT files content
        const blockBat = generateBlockBat(data, version);
        const unblockBat = generateUnblockBat(data, version);

        // Save files
        const blockFileName = `block_games_${version}.bat`;
        const unblockFileName = `unblock_games_${version}.bat`;

        fs.writeFileSync(path.join(EXPORTS_DIR, blockFileName), blockBat);
        fs.writeFileSync(path.join(EXPORTS_DIR, unblockFileName), unblockBat);

        // Update version and history
        data.version.patch++;
        if (data.version.patch >= 10) {
            data.version.patch = 0;
            data.version.minor++;
            if (data.version.minor >= 10) {
                data.version.minor = 0;
                data.version.major++;
            }
        }
        data.exportHistory.unshift({
            version,
            date: new Date().toISOString(),
            blockFile: blockFileName,
            unblockFile: unblockFileName
        });
        writeData(data);

        res.json({
            success: true,
            version,
            files: {
                block: blockFileName,
                unblock: unblockFileName
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to export BAT files' });
    }
};

// Get versions/history
exports.getVersions = (req, res) => {
    try {
        const data = readData();
        res.json({
            currentVersion: `v${data.version.major}.${data.version.minor}.${data.version.patch}`,
            history: data.exportHistory
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get versions' });
    }
};

// Download single file
exports.downloadFile = (req, res) => {
    const filePath = path.join(EXPORTS_DIR, req.params.filename);
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ error: 'File not found' });
    }
};

// Download zip with both files
exports.downloadZip = (req, res) => {
    try {
        const data = readData();
        const version = req.params.version;

        // Find the history entry for this version
        const historyEntry = data.exportHistory.find(h => h.version === version);
        if (!historyEntry) {
            return res.status(404).json({ error: 'Version not found' });
        }

        const blockFilePath = path.join(EXPORTS_DIR, historyEntry.blockFile);
        const unblockFilePath = path.join(EXPORTS_DIR, historyEntry.unblockFile);

        // Check if both files exist
        if (!fs.existsSync(blockFilePath) || !fs.existsSync(unblockFilePath)) {
            return res.status(404).json({ error: 'BAT files not found' });
        }

        // Set response headers for zip download
        const zipFileName = `game_blocker_${version}.zip`;
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${zipFileName}"`);

        // Create archive
        const archive = archiver('zip', { zlib: { level: 9 } });

        // Handle archive errors
        archive.on('error', (err) => {
            res.status(500).json({ error: 'Failed to create zip file' });
        });

        // Pipe archive to response
        archive.pipe(res);

        // Add files to archive
        archive.file(blockFilePath, { name: historyEntry.blockFile });
        archive.file(unblockFilePath, { name: historyEntry.unblockFile });

        // Finalize archive
        archive.finalize();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to download zip' });
    }
};

// Delete history entry
exports.deleteHistory = (req, res) => {
    try {
        const version = req.params.version;
        const data = readData();

        // Find the history entry
        const historyEntry = data.exportHistory.find(h => h.version === version);
        if (!historyEntry) {
            return res.status(404).json({ error: 'History entry not found' });
        }

        // Delete associated files
        const blockFilePath = path.join(EXPORTS_DIR, historyEntry.blockFile);
        const unblockFilePath = path.join(EXPORTS_DIR, historyEntry.unblockFile);

        if (fs.existsSync(blockFilePath)) {
            fs.unlinkSync(blockFilePath);
        }
        if (fs.existsSync(unblockFilePath)) {
            fs.unlinkSync(unblockFilePath);
        }

        // Remove from history
        data.exportHistory = data.exportHistory.filter(h => h.version !== version);
        writeData(data);

        res.json({ success: true, message: `Deleted ${version}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete history entry' });
    }
};
