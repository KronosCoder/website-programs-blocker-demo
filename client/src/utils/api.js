// API Base URL
export const API_BASE = import.meta.env.VITE_API_BASE

// ==================== TOKEN MANAGEMENT ====================

export const getToken = () => localStorage.getItem('auth_token')
export const setToken = (token) => localStorage.setItem('auth_token', token)
export const removeToken = () => localStorage.removeItem('auth_token')

function getAuthHeaders() {
    const token = getToken()
    return token ? { 'Authorization': `Bearer ${token}` } : {}
}

async function authFetch(url, options = {}) {
    const headers = {
        ...options.headers,
        ...getAuthHeaders()
    }

    const res = await fetch(url, { ...options, headers })

    if (res.status === 401) {
        removeToken()
        window.location.href = '/auth'
        throw new Error('Unauthorized')
    }

    return res
}

// ==================== API FUNCTIONS ====================

// Fetch blocklist data for a specific room
export const fetchBlocklist = async (roomId) => {
    const res = await authFetch(`${API_BASE}/blocklist?roomId=${roomId}`)
    return res.json()
}

// Add website to a specific room
export const addWebsiteApi = async (url, roomId) => {
    const res = await authFetch(`${API_BASE}/websites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, roomId })
    })
    return res.json()
}

// Delete website
export const deleteWebsiteApi = async (id) => {
    await authFetch(`${API_BASE}/websites/${id}`, { method: 'DELETE' })
}

// Add program to a specific room
export const addProgramApi = async (program, roomId) => {
    const res = await authFetch(`${API_BASE}/programs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...program, roomId })
    })
    return res.json()
}

// Delete program
export const deleteProgramApi = async (id) => {
    await authFetch(`${API_BASE}/programs/${id}`, { method: 'DELETE' })
}

// Get redirect URL
export const getRedirectUrlApi = async () => {
    const res = await authFetch(`${API_BASE}/redirect-url`)
    return res.json()
}

// Set redirect URL
export const setRedirectUrlApi = async (url) => {
    const res = await authFetch(`${API_BASE}/redirect-url`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    })
    return res.json()
}
