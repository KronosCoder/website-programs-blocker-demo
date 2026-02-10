const supabase = require('./supabase');

// ==================== WEBSITES ====================

async function getWebsites() {
    const { data, error } = await supabase
        .from('websites')
        .select('*')
        .order('id');
    if (error) throw error;
    return data;
}

async function addWebsite(url) {
    const { data, error } = await supabase
        .from('websites')
        .insert({ url })
        .select()
        .single();
    if (error) throw error;
    return data;
}

async function deleteWebsite(id) {
    const { error } = await supabase
        .from('websites')
        .delete()
        .eq('id', id);
    if (error) throw error;
}

// ==================== PROGRAMS ====================

async function getPrograms() {
    const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('id');
    if (error) throw error;
    // Map snake_case DB columns to camelCase for compatibility
    return data.map(p => ({
        id: p.id,
        name: p.name,
        path: p.path,
        processName: p.process_name
    }));
}

async function addProgram({ name, path: programPath, processName }) {
    const { data, error } = await supabase
        .from('programs')
        .insert({
            name,
            path: programPath || '',
            process_name: processName
        })
        .select()
        .single();
    if (error) throw error;
    // Return camelCase format
    return {
        id: data.id,
        name: data.name,
        path: data.path,
        processName: data.process_name
    };
}

async function deleteProgram(id) {
    const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);
    if (error) throw error;
}

// ==================== APP CONFIG (Version) ====================

async function getVersion() {
    const { data, error } = await supabase
        .from('app_config')
        .select('value')
        .eq('key', 'version')
        .single();
    if (error) throw error;
    return data.value;
}

async function incrementVersion() {
    const version = await getVersion();
    version.patch++;
    if (version.patch >= 10) {
        version.patch = 0;
        version.minor++;
        if (version.minor >= 10) {
            version.minor = 0;
            version.major++;
        }
    }
    const { error } = await supabase
        .from('app_config')
        .update({ value: version })
        .eq('key', 'version');
    if (error) throw error;
    return version;
}

// ==================== COMBINED (for blocklist endpoint) ====================

async function getBlocklist() {
    const [websites, programs, version] = await Promise.all([
        getWebsites(),
        getPrograms(),
        getVersion()
    ]);
    return { websites, programs, version };
}

module.exports = {
    getWebsites,
    addWebsite,
    deleteWebsite,
    getPrograms,
    addProgram,
    deleteProgram,
    getVersion,
    incrementVersion,
    getBlocklist
};
