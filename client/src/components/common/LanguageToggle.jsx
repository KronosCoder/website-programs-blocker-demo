import { Languages } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage()

    return (
        <button
            onClick={toggleLanguage}
            className="px-3 py-2 rounded-xl glass hover:bg-slate-700/50 transition-all duration-300 cursor-pointer flex items-center gap-2 group"
            aria-label={language === 'en' ? 'Switch to Thai' : 'Switch to English'}
        >
            <Languages className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
            <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors uppercase">
                {language}
            </span>
        </button>
    )
}
