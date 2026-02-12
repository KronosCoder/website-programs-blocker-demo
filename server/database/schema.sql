-- ============================================================
-- Supabase SQL Schema for Website & Programs Blocker
-- Compatible with the existing server/models/dataModel.js
-- ============================================================

-- ==================== SETTINGS ====================
-- Used by: authController.js (passphrase verification)
-- Columns: key (text PK), value (text)
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- Insert default passphrase (change this!)
INSERT INTO settings (key, value)
VALUES ('passphrase', 'your-secret-passphrase')
ON CONFLICT (key) DO NOTHING;

-- ==================== APP CONFIG ====================
-- Used by: dataModel.js (version, redirect_url)
-- Columns: key (text PK), value (jsonb for version / text-compatible for redirect_url)
CREATE TABLE IF NOT EXISTS app_config (
    key TEXT PRIMARY KEY,
    value JSONB
);

-- Insert default version
INSERT INTO app_config (key, value)
VALUES ('version', '{"major": 1, "minor": 0, "patch": 0}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Insert default redirect URL (empty string)
INSERT INTO app_config (key, value)
VALUES ('redirect_url', '""'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ==================== ROOMS ====================
-- Room numbering for Building 9:
--   First digit  = building number (9)
--   Second digit = floor number (2-4)
--   Third char   = room number (A for room 0, then 1-9)
-- Example: 92A = Building 9, Floor 2, Room A
-- Example: 942 = Building 9, Floor 4, Room 2

CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY,            -- e.g. '92A', '921', '942'
    building INTEGER NOT NULL,      -- e.g. 9
    floor INTEGER NOT NULL,         -- e.g. 2, 3, 4
    room_label TEXT NOT NULL,       -- e.g. 'A', '1', '2', ..., '9'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generate rooms for Building 9, Floors 2-4
-- Each floor: 9XA, 9X1, 9X2, ..., 9X9 (10 rooms per floor)

-- Floor 2
INSERT INTO rooms (id, building, floor, room_label) VALUES
    ('92A', 9, 2, 'A'),
    ('921', 9, 2, '1'),
    ('922', 9, 2, '2'),
    ('923', 9, 2, '3'),
    ('924', 9, 2, '4'),
    ('925', 9, 2, '5'), 
    ('926', 9, 2, '6'),
    ('927', 9, 2, '7'),
    ('928', 9, 2, '8'),
    ('929', 9, 2, '9')
ON CONFLICT (id) DO NOTHING;

-- Floor 3
INSERT INTO rooms (id, building, floor, room_label) VALUES
    ('93A', 9, 3, 'A'),
    ('931', 9, 3, '1'),
    ('932', 9, 3, '2'),
    ('933', 9, 3, '3'),
    ('934', 9, 3, '4'),
    ('935', 9, 3, '5'),
    ('936', 9, 3, '6'),
    ('937', 9, 3, '7'),
    ('938', 9, 3, '8'),
    ('939', 9, 3, '9')
ON CONFLICT (id) DO NOTHING;

-- Floor 4
INSERT INTO rooms (id, building, floor, room_label) VALUES
    ('94A', 9, 4, 'A'),
    ('941', 9, 4, '1'),
    ('942', 9, 4, '2'),
    ('943', 9, 4, '3'),
    ('944', 9, 4, '4'),
    ('945', 9, 4, '5'),
    ('946', 9, 4, '6'),
    ('947', 9, 4, '7'),
    ('948', 9, 4, '8'),
    ('949', 9, 4, '9')
ON CONFLICT (id) DO NOTHING;

-- ==================== WEBSITES ====================
-- Used by: dataModel.js (getWebsites, addWebsite, deleteWebsite)
-- Columns: id (serial PK), url (text), room_id (FK to rooms)
CREATE TABLE IF NOT EXISTS websites (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    room_id TEXT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster room-based queries
CREATE INDEX IF NOT EXISTS idx_websites_room_id ON websites(room_id);

-- ==================== PROGRAMS ====================
-- Used by: dataModel.js (getPrograms, addProgram, deleteProgram)
-- Columns: id (serial PK), name (text), path (text), process_name (text), room_id (FK)
CREATE TABLE IF NOT EXISTS programs (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    path TEXT DEFAULT '',
    process_name TEXT NOT NULL,
    room_id TEXT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster room-based queries
CREATE INDEX IF NOT EXISTS idx_programs_room_id ON programs(room_id);

-- ============================================================
-- ENABLE ROW LEVEL SECURITY (optional, recommended)
-- ============================================================
-- Uncomment the lines below if you want RLS enabled.
-- You'll need to create policies that match your auth strategy.
--
-- ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE websites ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;
