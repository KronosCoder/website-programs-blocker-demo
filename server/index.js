require('dotenv').config();
const express = require('express');
const cors = require('cors');

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

// ===== API ROUTES =====
app.use('/api/blocklist', blocklistRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/programs', programRoutes);
app.use('/api', exportRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Game Blocker API running at http://localhost:${PORT}`);
});

module.exports = app
