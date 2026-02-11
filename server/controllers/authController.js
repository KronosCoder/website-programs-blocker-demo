const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.verifyPassphrase = async (req, res) => {
    try {
        const { passphrase } = req.body;

        if (!passphrase) {
            return res.status(400).json({ error: 'Passphrase is required' });
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

        const correctPassphrase = data.value;

        if (passphrase === correctPassphrase) {
            return res.json({ success: true });
        } else {
            return res.status(401).json({ error: 'Incorrect passphrase' });
        }

    } catch (err) {
        console.error('Auth error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
