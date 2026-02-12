const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyPassphrase = async (req, res) => {
    try {
        const { passphrase } = req.body;

        if (!passphrase) {
            return res.status(400).json({ error: 'Passphrase is required' });
        }

        if (!JWT_SECRET) {
            console.error('JWT_SECRET is not set in environment variables');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const { data, error } = await supabase
            .from('settings')
            .select('value')
            .eq('key', 'passphrase')
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: 'Server configuration error' });
        }

        if (!data) {
            console.error('Passphrase not found in settings');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const hashedPassphrase = data.value;

        // Compare input passphrase with bcrypt hash from DB
        const isMatch = await bcrypt.compare(passphrase, hashedPassphrase);

        if (isMatch) {
            // Sign JWT token (expires in 8 hours)
            const token = jwt.sign(
                { authenticated: true },
                JWT_SECRET,
                { expiresIn: '8h' }
            );

            return res.json({ success: true, token });
        } else {
            return res.status(401).json({ error: 'Incorrect passphrase' });
        }

    } catch (err) {
        console.error('Auth error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
