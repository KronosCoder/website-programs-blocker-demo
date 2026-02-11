import { useState } from 'react'
import { Upload, Package, Link, Save, Check } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export function ExportSection({ onExport, isRevealRedirectUrl, redirectUrl, onSaveRedirectUrl }) {
    const { t } = useLanguage()
    const [urlInput, setUrlInput] = useState(redirectUrl || '')
    const [saved, setSaved] = useState(false)

    const handleSaveUrl = async () => {
        const success = await onSaveRedirectUrl(urlInput)
        if (success) {
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        }
    }

    return (
        <section className="glass rounded-2xl p-6 mt-6 animate-fade-in glow-green" style={{ animationDelay: '200ms' }}>
            {/* Redirect URL Config */}
            {isRevealRedirectUrl && (
                <div className="mb-6">
                    <h3 className="text-base font-semibold flex items-center gap-2 text-[var(--text-primary)] mb-2">
                        <Link className="w-5 h-5 text-amber-400" /> {t('redirectUrlLabel')}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-xs mb-3">
                        {t('redirectUrlDescription')}
                    </p>
                    <div className="grid gap-2 grid-cols-12">
                        <input
                            type="url"
                            value={urlInput}
                            onChange={(e) => { setUrlInput(e.target.value); setSaved(false) }}
                            placeholder={t('redirectUrlPlaceholder')}
                            className="col-span-12 md:col-span-9 px-4 py-2.5 rounded-xl glass-input text-[var(--text-primary)] placeholder-slate-500 transition-all focus:outline-none"
                        />
                        <button
                            onClick={handleSaveUrl}
                            className={`col-span-12 md:col-span-3 px-5 py-2.5 rounded-lg font-semibold btn-hover flex items-center justify-center gap-1 cursor-pointer transition-all ${saved
                                ? 'bg-gradient-to-r from-green-600 to-green-500'
                                : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400'
                                }`}
                        >
                            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                            {saved ? t('saved') : t('save')}
                        </button>
                    </div>
                </div>
            )}

            {/* Export Button */}
            <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${isRevealRedirectUrl ? 'pt-4 border-t border-white/5' : ''}`}>
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-[var(--text-primary)]">
                        <Upload className="w-6 h-6 text-green-400" /> {t('exportTitle')}
                    </h2>
                    <p className="text-[var(--text-secondary)] text-sm mt-1">
                        {t('exportDescription')}
                    </p>
                </div>
                <button
                    onClick={onExport}
                    className="px-8 py-3 rounded-xl btn-gradient font-bold text-lg text-white cursor-pointer"
                >
                    <Package className="w-5 h-5 inline mr-2" /> {t('exportButton')}
                </button>
            </div>
        </section>
    )
}
