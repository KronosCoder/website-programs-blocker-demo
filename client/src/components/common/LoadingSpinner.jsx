import { useLanguage } from '../../context/LanguageContext'

export function LoadingSpinner() {
    const { t } = useLanguage()

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-2xl text-blue-400 animate-pulse-soft">{t('loading')}</div>
        </div>
    )
}

