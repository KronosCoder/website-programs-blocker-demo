import { useState, useEffect } from 'react'
import {
    fetchBlocklist,
    addWebsiteApi,
    deleteWebsiteApi,
    addProgramApi,
    deleteProgramApi,
    API_BASE
} from '../utils/api'
import { Toast, showLoading, closeLoading, confirmDialog, showQuestion } from '../utils/toast'

export function useBlocklist(t) {
    const [blocklist, setBlocklist] = useState({ websites: [], programs: [] })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const blockData = await fetchBlocklist()
            setBlocklist(blockData)
        } catch (error) {
            Toast.fire({ icon: 'error', title: t('failedToFetchData') })
        } finally {
            setLoading(false)
        }
    }

    // Add website
    const addWebsite = async (url) => {
        if (!url.trim()) {
            Toast.fire({ icon: 'warning', title: t('pleaseEnterUrl') })
            return false
        }

        // Basic URL validation
        const urlPattern = /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
        const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '').replace(/\/.*$/, '')
        if (!urlPattern.test(cleanUrl)) {
            Toast.fire({ icon: 'warning', title: t('pleaseEnterValidUrl') })
            return false
        }

        // Check if website already exists
        const exists = blocklist.websites.some(w => w.url.toLowerCase() === cleanUrl.toLowerCase())
        if (exists) {
            Toast.fire({ icon: 'warning', title: t('websiteAlreadyExists') })
            return false
        }

        try {
            showLoading(t('addingWebsite'))
            const website = await addWebsiteApi(url)
            setBlocklist(prev => ({ ...prev, websites: [...prev.websites, website] }))
            closeLoading()
            Toast.fire({ icon: 'success', title: t('websiteAddedSuccess') })
            return true
        } catch (error) {
            closeLoading()
            Toast.fire({ icon: 'error', title: t('failedToAddWebsite') })
            return false

        }
    }

    // Delete website
    const deleteWebsite = async (id, url) => {
        const confirmed = await confirmDialog({
            title: t('deleteWebsiteTitle'),
            text: `${t('deleteWebsiteText')} "${url}"?`,
            confirmText: t('yesDeleteIt'),
            cancelText: t('cancel')
        })

        if (confirmed) {
            try {
                await deleteWebsiteApi(id)
                setBlocklist(prev => ({
                    ...prev,
                    websites: prev.websites.filter(w => w.id !== id)
                }))
                Toast.fire({ icon: 'success', title: t('websiteRemoved') })
            } catch (error) {
                Toast.fire({ icon: 'error', title: t('failedToRemoveWebsite') })
            }
        }
    }

    // Add program with validation
    const addProgram = async (program) => {
        if (!program.name.trim()) {
            Toast.fire({ icon: 'warning', title: t('pleaseEnterProgramName') })
            return false
        }
        if (!program.processName.trim()) {
            Toast.fire({ icon: 'warning', title: t('pleaseEnterProcessName') })
            return false
        }

        // Check if program already exists (by name or processName)
        const existsByName = blocklist.programs.some(p => p.name.toLowerCase() === program.name.trim().toLowerCase())
        const existsByProcess = blocklist.programs.some(p => p.processName.toLowerCase() === program.processName.trim().toLowerCase())
        if (existsByName) {
            Toast.fire({ icon: 'warning', title: t('programNameExists') })
            return false
        }
        if (existsByProcess) {
            Toast.fire({ icon: 'warning', title: t('programProcessExists') })
            return false
        }

        try {
            showLoading(t('addingProgram'))
            const newProgram = await addProgramApi(program)
            setBlocklist(prev => ({ ...prev, programs: [...prev.programs, newProgram] }))
            closeLoading()
            Toast.fire({ icon: 'success', title: t('programAddedSuccess') })
            return true
        } catch (error) {
            closeLoading()
            Toast.fire({ icon: 'error', title: t('failedToAddProgram') })
            return false
        }
    }

    // delete program
    const deleteProgram = async (id, name) => {
        const confirmed = await confirmDialog({
            title: t('deleteProgramTitle'),
            text: `${t('deleteWebsiteText')} "${name}"?`,
            confirmText: t('yesDeleteIt'),
            cancelText: t('cancel')
        })

        if (confirmed) {
            try {
                await deleteProgramApi(id)
                setBlocklist(prev => ({
                    ...prev,
                    programs: prev.programs.filter(p => p.id !== id)
                }))
                Toast.fire({ icon: 'success', title: t('programRemoved') })
            } catch (error) {
                Toast.fire({ icon: 'error', title: t('failedToRemoveProgram') })
            }
        }
    }

    // Export bat files and download directly
    const exportBat = async () => {
        const confirmed = await showQuestion({
            title: t('exportBatTitle'),
            html: `
        <p style="color: #94a3b8;">${t('exportBatText')}</p>
        <p style="color: #64748b; font-size: 0.875rem; margin-top: 0.5rem;">${t('exportBatNote')}</p>
      `,
            confirmText: t('yesExport'),
            cancelText: t('cancel')
        })

        if (confirmed) {
            try {
                showLoading(t('exporting'), `<p style="color: #94a3b8;">${t('generatingBat')}</p>`)

                // Direct download via browser
                const link = document.createElement('a')
                link.href = `${API_BASE}/export-download`
                link.click()

                closeLoading()
                Toast.fire({ icon: 'success', title: t('exportSuccess') })
            } catch (error) {
                closeLoading()
                Toast.fire({ icon: 'error', title: t('exportFailed') })
            }
        }
    }

    return {
        blocklist,
        loading,
        addWebsite,
        deleteWebsite,
        addProgram,
        deleteProgram,
        exportBat
    }
}
