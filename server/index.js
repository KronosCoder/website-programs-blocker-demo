require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import routes
const blocklistRoutes = require('./routes/blocklistRoutes');
const websiteRoutes = require('./routes/websiteRoutes');
const programRoutes = require('./routes/programRoutes');
const exportRoutes = require('./routes/exportRoutes');
const redirectRoutes = require('./routes/redirectRoutes');
const authRoutes = require('./routes/authRoutes');

// Import middleware
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ===== PUBLIC ROUTES (no auth required) =====
app.use('/api', authRoutes);

// ===== PROTECTED ROUTES (auth required) =====
app.use('/api/blocklist', authMiddleware, blocklistRoutes);
app.use('/api/websites', authMiddleware, websiteRoutes);
app.use('/api/programs', authMiddleware, programRoutes);
app.use('/api/redirect-url', authMiddleware, redirectRoutes);
app.use('/api', authMiddleware, exportRoutes);

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
