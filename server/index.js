const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Import routes
const blocklistRoutes = require('./routes/blocklistRoutes');
const websiteRoutes = require('./routes/websiteRoutes');
const programRoutes = require('./routes/programRoutes');
const exportRoutes = require('./routes/exportRoutes');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure exports directory exists
const EXPORTS_DIR = path.join(__dirname, 'exports');
if (!fs.existsSync(EXPORTS_DIR)) {
  fs.mkdirSync(EXPORTS_DIR, { recursive: true });
}

// ===== API ROUTES =====
app.use('/api/blocklist', blocklistRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/programs', programRoutes);
app.use('/api', exportRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Game Blocker API running at http://localhost:${PORT}`);
});

module.exports = app
