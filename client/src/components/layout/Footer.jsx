import { Shield } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export function Footer() {
    const { t } = useLanguage()

    return (
        <footer className="text-center mt-8 text-[var(--text-secondary)] text-sm">
            <p className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" /> {t('footerText')}
            </p>
        </footer>
    )
}

