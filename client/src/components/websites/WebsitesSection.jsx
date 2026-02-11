import { useState } from 'react'
import { Globe, Plus } from 'lucide-react'
import { WebsiteItem } from './WebsiteItem'
import { useLanguage } from '../../context/LanguageContext'

export function WebsitesSection({ websites, onAdd, onDelete }) {
    const [newUrl, setNewUrl] = useState('')
    const { t } = useLanguage()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await onAdd(newUrl)
        if (success) setNewUrl('')
    }

    return (
        <section className="glass rounded-2xl p-6 glow-blue animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-[var(--text-primary)]">
                    <Globe className="w-6 h-6 text-blue-400" /> {t('websitesToBlock')}
                </h2>
                <span className="px-3 py-1 rounded-full glass-button text-blue-300 text-sm border border-blue-500/20">
                    {websites.length} {t('sites')}
                </span>
            </div>

            {/* Add URL Form */}
            <form onSubmit={handleSubmit} className="grid gap-2 mb-4 grid-cols-12">
                <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder={t('enterUrl')}
                    className="col-span-12 md:col-span-9 px-4 py-2.5 rounded-xl glass-input text-[var(--text-primary)] placeholder-slate-500 transition-all focus:outline-none"
                />
                <button
                    type="submit"
                    className="col-span-12 md:col-span-3 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 font-semibold btn-hover flex items-center gap-1 cursor-pointer text-center"
                >
                    <Plus className="w-4 h-4" /> {t('add')}
                </button>
            </form>

            {/* Website List */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                {[...websites].reverse().map((site, index) => (
                    <WebsiteItem
                        key={site.id}
                        site={site}
                        index={index}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </section>
    )
}

