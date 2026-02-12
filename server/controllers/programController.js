const { addProgram: addProgramDb, deleteProgram: deleteProgramDb } = require('../models/dataModel');

// Add program
exports.addProgram = async (req, res) => {
    try {
        const { name, path: programPath, processName, roomId } = req.body;
        if (!name || !processName) {
            return res.status(400).json({ error: 'Name and process name are required' });
        }
        if (!roomId) {
            return res.status(400).json({ error: 'roomId is required' });
        }

        const newProgram = await addProgramDb({ name, path: programPath, processName }, roomId);

        res.json(newProgram);
    } catch (error) {
        console.error('[ERROR] addProgram:', error.message);
        res.status(500).json({ error: 'Failed to add program' });
    }
};

// Delete program
exports.deleteProgram = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await deleteProgramDb(id);
        res.json({ success: true });
    } catch (error) {
        console.error('[ERROR] deleteProgram:', error.message);
        res.status(500).json({ error: 'Failed to delete program' });
    }
};
