const { readData, writeData, getNextId } = require('../models/dataModel');

// Add program
exports.addProgram = (req, res) => {
    try {
        const { name, path: programPath, processName } = req.body;
        if (!name || !processName) {
            return res.status(400).json({ error: 'Name and process name are required' });
        }

        const data = readData();
        const newProgram = {
            id: getNextId(data.programs),
            name,
            path: programPath || '',
            processName
        };
        data.programs.push(newProgram);
        writeData(data);

        res.json(newProgram);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add program' });
    }
};

// Delete program
exports.deleteProgram = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = readData();
        data.programs = data.programs.filter(p => p.id !== id);
        writeData(data);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete program' });
    }
};
