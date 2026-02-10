const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const supabase = require('./models/supabase');

async function testConnection() {
    console.log('Testing Supabase connection...');

    try {
        console.log('1. Testing getWebsites...');
        const websites = await supabase.from('websites').select('count', { count: 'exact', head: true });
        if (websites.error) throw websites.error;
        console.log('   Success! (Websites table accessible)');

        console.log('2. Testing getPrograms...');
        const programs = await supabase.from('programs').select('count', { count: 'exact', head: true });
        if (programs.error) throw programs.error;
        console.log('   Success! (Programs table accessible)');

        console.log('3. Testing getVersion (app_config)...');
        const version = await supabase.from('app_config').select('*').eq('key', 'version').single();
        if (version.error) throw version.error;
        console.log('   Success! Version data:', version.data);

        console.log('\nAll Supabase checks passed locally!');
    } catch (error) {
        console.error('\nFAILED:', error.message);
        console.error('Details:', error);
    }
}

testConnection();

module.exports = testConnection;
