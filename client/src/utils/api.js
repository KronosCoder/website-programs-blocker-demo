// API Base URL
export const API_BASE = import.meta.env.VITE_API_BASE


// Fetch blocklist data
export const fetchBlocklist = async () => {
    const res = await fetch(`${API_BASE}/blocklist`)
    return res.json()
}

// Add website
export const addWebsiteApi = async (url) => {
    const res = await fetch(`${API_BASE}/websites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    })
    return res.json()
}

// Delete website
export const deleteWebsiteApi = async (id) => {
    await fetch(`${API_BASE}/websites/${id}`, { method: 'DELETE' })
}

// Add program
export const addProgramApi = async (program) => {
    const res = await fetch(`${API_BASE}/programs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(program)
    })
    return res.json()
}

// Delete program
export const deleteProgramApi = async (id) => {
    await fetch(`${API_BASE}/programs/${id}`, { method: 'DELETE' })
}

// Get redirect URL
export const getRedirectUrlApi = async () => {
    const res = await fetch(`${API_BASE}/redirect-url`)
    return res.json()
}

// Set redirect URL
export const setRedirectUrlApi = async (url) => {
    const res = await fetch(`${API_BASE}/redirect-url`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    })
    return res.json()
}
